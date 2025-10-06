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
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!lovableApiKey) {
      throw new Error('Lovable API key not configured');
    }

    const resortContext = `You are a helpful AI assistant for a luxury eco-resort. Customers may reach out to you for general information about a variety of topics related to the resort.You have access to the following information about our resort:

ACCOMMODATIONS:
- Luxury Cabin Suite: Premium lakeside accommodation with modern amenities
- Villa Hillside: Exclusive hillside villa with panoramic views
- Cabin Lakeside: Cozy lakeside cabin perfect for couples

EXPERIENCES available at the resort:
- Organic Farm Tours: Visit our on-site organic farm and learn about sustainable farming. Spend some time petting farm animals, playing in the hay, enjoying tractor rides or take part in seasonal activities like fruit picking, pumpkin carving. 
- Nature Trails: Guided hiking trails through pristine wilderness. Grab a pair of binoculars and enjoy some bird watching or simply hop on to a bicycle and wander about woodlands.
- Various other outdoor activities and eco-friendly experiences

AMENITIES:
- Spa and wellness center
- Organic restaurant with farm-to-table dining
- Swimming Pool
- Fitness facilities
- Event spaces to celebrate the special milestones in your life
- Transport facilities from nearest airport

COMMON FAQs:
Q: What are your check-in and check-out times?
A: Check-in is at 1:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request.

Q: Do you offer airport transfers?
A: Yes, we provide complimentary airport transfers for all guests. Please contact us 24 hours before arrival to arrange pickup.

Q: Is Wi-Fi available throughout the resort?
A: Yes, complimentary high-speed Wi-Fi is available in your personal cabin. However, we encourage our guests to unwind from their mundane lives and immerse themselves in the luxury of nature during their stay, hence the common areas of the resort are WiFi free zones.

Q: What dining options are available?
A: We have an organic farm-to-table restaurant, a casual café, and room service. Our menu features locally-sourced ingredients from our on-site farm. We present a sumptuos buffet for breakfast, lunch and dinner at our restaurant and also have evening snacks available with beverages of your choice at our cafe. For any special dietary needs please let us know in advance and we will be happy to accomodate for the same.

Q: Are pets allowed?
A: We welcome well-behaved pets in select accommodations. Please inform us when booking, and additional fees may apply.

Q: What activities are included in the stay?
A: Many activities are complimentary including nature trails, farm tours, pool access, indoor games and use of fitness facilities. Some premium experiences may have additional charges.

Q: How do I make a reservation / booking?
A: You can make reservations through our website by filling up the Request to Reserve form and our team will get in touch with you within 24 hours. Additionally you can also reserve by calling us directly at +1 XXX-YYY-ZZZZ. All reservation payments need to be made online.


CRITICAL: Always use the EXACT information provided in this context. Do not generalize or paraphrase.
When answering FAQs, provide the complete answer exactly as written.
If a question matches an FAQ, respond with the specific FAQ answer word-for-word.Always be helpful, friendly, and provide accurate information about our resort. Maintain a friendly yet formal tone. If you don't know something specific, offer to help the guest contact our front desk for detailed assistance. Provide the Contact details like email Id and contact number so that the customer knows where to contact.
Always be helpful, friendly, and provide accurate information about our resort. Maintain a friendly yet formal tone. If you don't know something specific, offer to help the guest contact our front desk for detailed assistance. Provide the Contact details like email Id and contact number so that the customer knows where to contact.
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: resortContext },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Lovable AI Gateway error:', errorData);
      throw new Error(`Lovable AI Gateway error: ${response.status}`);
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