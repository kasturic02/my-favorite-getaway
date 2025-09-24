import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm here to help you with any questions about our luxury eco-resort. Feel free to ask about our accommodations, amenities, dining, activities, or booking information!", 
      isBot: true 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message;
    setMessage('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { message: userMessage }
      });

      if (error) {
        throw error;
      }

      setMessages(prev => [...prev, { 
        text: data.response || "I'm sorry, I couldn't generate a response right now.", 
        isBot: true 
      }]);
    } catch (error) {
      console.error('Error calling AI chat:', error);
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I'm having trouble responding right now. Please try again or contact our front desk for assistance.", 
        isBot: true 
      }]);
      toast({
        title: "Connection Error",
        description: "Unable to connect to chat service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 flex flex-col shadow-lg z-50 bg-background border">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold">Chat Support</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.isBot
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="sm" className="px-3" disabled={isLoading || !message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            {isLoading && (
              <p className="text-sm text-muted-foreground mt-2">AI is typing...</p>
            )}
          </div>
        </Card>
      )}

      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 shadow-lg z-50 transition-all duration-200 ${
          isOpen 
            ? "h-14 w-14 rounded-full p-0" 
            : "rounded-full px-4 py-3 h-auto w-auto"
        }`}
        size="lg"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium whitespace-nowrap">
              Ask Me anything
            </span>
          </div>
        )}
      </Button>
    </>
  );
};

export default ChatBot;