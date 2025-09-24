import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const resortContext = `You are a helpful AI assistant for a luxury eco-resort. You have access to the following information about our resort:

ACCOMMODATIONS:
- Luxury Cabin Suite: Premium lakeside accommodation with modern amenities
- Villa Hillside: Exclusive hillside villa with panoramic views
- Cabin Lakeside: Cozy lakeside cabin perfect for couples

EXPERIENCES:
- Organic Farm Tours: Visit our on-site organic farm and learn about sustainable farming
- Nature Trails: Guided hiking trails through pristine wilderness
- Various outdoor activities and eco-friendly experiences

AMENITIES:
- Spa and wellness center
- Organic restaurant with farm-to-table dining
- Private beach access
- Fitness facilities
- Conference and event spaces

COMMON FAQs:
Q: What are your check-in and check-out times?
A: Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request.

Q: Do you offer airport transfers?
A: Yes, we provide complimentary airport transfers for all guests. Please contact us 24 hours before arrival to arrange pickup.

Q: Is Wi-Fi available throughout the resort?
A: Yes, complimentary high-speed Wi-Fi is available in all accommodations and common areas.

Q: What dining options are available?
A: We have an organic farm-to-table restaurant, a casual café, and room service. Our menu features locally-sourced ingredients from our on-site farm.

Q: Are pets allowed?
A: We welcome well-behaved pets in select accommodations. Please inform us when booking, and additional fees may apply.

Q: What activities are included in the stay?
A: Many activities are complimentary including nature trails, farm tours, beach access, and use of fitness facilities. Some premium experiences may have additional charges.

Q: How do I make a reservation?
A: You can make reservations through our website, by calling us directly, or through our online booking system.

Always be helpful, friendly, and provide accurate information about our resort. If you don't know something specific, offer to help the guest contact our front desk for detailed assistance.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: resortContext },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response generated successfully');

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate response',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});