import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
    const { messages } = await req.json();
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!lovableApiKey) {
      throw new Error('Lovable API key not configured');
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration not found');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const resortContext = `ROLE AND PRIMARY DIRECTIVE:
You are a helpful AI assistant for a luxury eco-resort. Your PRIMARY goal is to provide EXACT, ACCURATE information as given below.

CRITICAL FAQ HANDLING PROTOCOL:
1. FIRST, check if the user's question matches ANY of the FAQs listed below
2. If it matches an FAQ, respond with the EXACT FAQ answer WORD-FOR-WORD
3. DO NOT rephrase, summarize, or add extra information to FAQ answers
4. DO NOT generalize or paraphrase FAQ answers
5. Copy the FAQ answer exactly as written, character by character

ACCOMMODATIONS:
- Luxury Cabin Suite: Premium lakeside accommodation with modern amenities
- Villa Hillside: Exclusive hillside villa with panoramic views
- Cabin Lakeside: Cozy lakeside cabin perfect for couples

EXPERIENCES:
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

===== FREQUENTLY ASKED QUESTIONS (ANSWER THESE EXACTLY AS WRITTEN) =====

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

===== END OF FAQs =====

AIRPORT TRANSFER BOOKING:

WHEN TO OFFER AIRPORT TRANSFERS:
- Proactively mention airport transfers when guests ask about:
  * Transportation options
  * Getting to/from the resort
  * Arrival or departure logistics
- When guests mention they have made a reservation
- If guests ask about check-in times or arrival details

HOW TO COLLECT INFORMATION CONVERSATIONALLY:
- Be warm, helpful, and natural - NOT like filling out a form
- Start by asking for their booking reference number first (explain you need this to arrange the transfer)
- Then collect other details in a friendly manner, one or two at a time
- For example: "Great! Could you share your booking reference number with me?" followed by "Perfect! And what's your flight number?"
- If guest provides multiple details at once, acknowledge and note what you still need
- NEVER list all requirements at once like a checklist - make it feel like a helpful conversation

REQUIRED INFORMATION TO COLLECT:
- Booking reference number (CRITICAL - must be collected FIRST and validated)
- Guest name
- Email address
- Contact number
- Number of guests traveling
- Flight number
- Special requests (optional - only ask if relevant or if guest mentions needs)

AFTER SUCCESSFUL BOOKING:
- Warmly confirm the transfer has been arranged
- Reassure the guest that the details have been received
- Mention that we'll be in touch 3 hours before arrival with driver details
- Thank them and ask if there's anything else you can help with

ERROR HANDLING:
- If booking reference is invalid: "I'm unable to find that booking reference in our system. Could you please double-check the reference number from your reservation confirmation?"
- If database error occurs: "I apologize, but I'm having trouble completing the booking right now. Please contact our front desk at +1 XXX-YYY-ZZZZ and they'll arrange your transfer immediately."
- Always remain helpful and provide alternative solutions
- Never expose technical error details to guests

FALLBACK INSTRUCTIONS:
- If a question does NOT match an FAQ, provide helpful information based on the resort details above
- Maintain a friendly yet formal tone
- If you don't know something specific, offer to help the guest contact our front desk
- Provide contact details: +1 XXX-YYY-ZZZZ or email (if they need specific assistance)`;

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
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.2,
        tools: [
          {
            type: 'function',
            function: {
              name: 'book_airport_transfer',
              description: 'Books an airport transfer for a guest. Use this when a guest wants to arrange airport pickup or transfer service. Collect all required information before calling this function.',
              parameters: {
                type: 'object',
                properties: {
                  guestName: {
                    type: 'string',
                    description: 'Full name of the guest'
                  },
                  guestEmail: {
                    type: 'string',
                    description: 'Email address of the guest'
                  },
                  contactNumber: {
                    type: 'number',
                    description: 'Contact phone number of the guest'
                  },
                  numberOfGuests: {
                    type: 'number',
                    description: 'Total number of guests requiring transfer'
                  },
                  flightNumber: {
                    type: 'string',
                    description: 'Flight number for arrival or departure'
                  },
                  bookingReferenceNumber: {
                    type: 'string',
                    description: 'Booking reference number for the reservation'
                  },
                  specialRequest: {
                    type: 'string',
                    description: 'Any special requests or requirements (optional)'
                  }
                },
                required: ['guestName', 'guestEmail', 'contactNumber', 'numberOfGuests', 'flightNumber', 'bookingReferenceNumber']
              }
            }
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Lovable AI Gateway error:', errorData);
      throw new Error(`Lovable AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if the AI wants to use a tool
    if (data.choices[0].message.tool_calls) {
      const toolCall = data.choices[0].message.tool_calls[0];
      
      if (toolCall.function.name === 'book_airport_transfer') {
        console.log('Processing airport transfer booking...');
        const args = JSON.parse(toolCall.function.arguments);
        
        // Validate booking reference number against Reservations table
        const { data: reservation, error: reservationError } = await supabase
          .from('Reservations')
          .select('*')
          .eq('Booking Reference Number', args.bookingReferenceNumber)
          .maybeSingle();
        
        if (reservationError) {
          console.error('Error checking reservation:', reservationError);
          
          // Send tool error back to AI
          const errorResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${lovableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                { role: 'system', content: resortContext },
                ...messages,
                data.choices[0].message,
                {
                  role: 'tool',
                  tool_call_id: toolCall.id,
                  content: JSON.stringify({
                    success: false,
                    error: 'Unable to verify booking reference. Please try again later.'
                  })
                }
              ],
              max_tokens: 500,
              temperature: 0.2,
            }),
          });
          
          const errorData = await errorResponse.json();
          return new Response(JSON.stringify({ response: errorData.choices[0].message.content }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        if (!reservation) {
          console.log('Invalid booking reference number');
          
          // Send tool result back to AI indicating invalid booking reference
          const invalidResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${lovableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                { role: 'system', content: resortContext },
                ...messages,
                data.choices[0].message,
                {
                  role: 'tool',
                  tool_call_id: toolCall.id,
                  content: JSON.stringify({
                    success: false,
                    error: 'Invalid booking reference number. Please verify your booking reference and try again.'
                  })
                }
              ],
              max_tokens: 500,
              temperature: 0.2,
            }),
          });
          
          const invalidData = await invalidResponse.json();
          return new Response(JSON.stringify({ response: invalidData.choices[0].message.content }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // Booking reference is valid, insert into Airport Transfers table
        const { data: transferData, error: insertError } = await supabase
          .from('Airport Transfers')
          .insert({
            'Guest Name': args.guestName,
            'Guest Email ID': args.guestEmail,
            'Guest Contact Number': args.contactNumber,
            'Number of Guests': args.numberOfGuests,
            'Flight Number': args.flightNumber,
            'Booking Reference Number': args.bookingReferenceNumber,
            'Special Request': args.specialRequest || null,
            'Status': 'Booking Received'
          })
          .select()
          .single();
        
        if (insertError) {
          console.error('Error inserting airport transfer:', insertError);
          
          // Send tool error back to AI
          const errorResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${lovableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                { role: 'system', content: resortContext },
                ...messages,
                data.choices[0].message,
                {
                  role: 'tool',
                  tool_call_id: toolCall.id,
                  content: JSON.stringify({
                    success: false,
                    error: 'Failed to book airport transfer. Please contact our front desk.'
                  })
                }
              ],
              max_tokens: 500,
              temperature: 0.2,
            }),
          });
          
          const errorData = await errorResponse.json();
          return new Response(JSON.stringify({ response: errorData.choices[0].message.content }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        console.log('Airport transfer booked successfully:', transferData);
        
        // Send tool result back to AI for confirmation message
        const confirmResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: resortContext },
              ...messages,
              data.choices[0].message,
              {
                role: 'tool',
                tool_call_id: toolCall.id,
                content: JSON.stringify({
                  success: true,
                  transferId: transferData.id,
                  bookingReference: args.bookingReferenceNumber,
                  guestName: args.guestName,
                  flightNumber: args.flightNumber,
                  numberOfGuests: args.numberOfGuests
                })
              }
            ],
            max_tokens: 500,
            temperature: 0.2,
          }),
        });
        
        const confirmData = await confirmResponse.json();
        return new Response(JSON.stringify({ response: confirmData.choices[0].message.content }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

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