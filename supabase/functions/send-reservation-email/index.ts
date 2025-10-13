import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReservationEmailRequest {
  name: string;
  email: string;
  contact: string;
  guests: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, contact, guests, roomType, checkInDate, checkOutDate }: ReservationEmailRequest = await req.json();

    console.log("Sending reservation confirmation email to:", email);

    // Format room type for display
    const roomTypeDisplay = roomType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const emailResponse = await resend.emails.send({
      from: "Farmside Lakeside Resort <onboarding@resend.dev>",
      to: [email],
      subject: "Reservation Confirmation - Farmside Lakeside Resort",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #2c5530 0%, #4a7c4e 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 1px solid #e0e0e0;
                border-top: none;
              }
              .detail-row {
                padding: 12px 0;
                border-bottom: 1px solid #f0f0f0;
              }
              .detail-label {
                font-weight: bold;
                color: #2c5530;
                display: inline-block;
                width: 150px;
              }
              .detail-value {
                color: #555;
              }
              .footer {
                background: #f8f8f8;
                padding: 20px;
                text-align: center;
                border-radius: 0 0 10px 10px;
                font-size: 14px;
                color: #777;
              }
              .highlight {
                background: #e8f5e9;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #4a7c4e;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">Reservation Confirmed!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Farmside Lakeside Resort</p>
            </div>
            
            <div class="content">
              <p>Dear ${name},</p>
              
              <p>Thank you for choosing Farmside Lakeside Resort! We're delighted to confirm your reservation request.</p>
              
              <div class="highlight">
                <h2 style="margin-top: 0; color: #2c5530;">Your Booking Details</h2>
                
                <div class="detail-row">
                  <span class="detail-label">Guest Name:</span>
                  <span class="detail-value">${name}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Room Type:</span>
                  <span class="detail-value">${roomTypeDisplay}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Check-in Date:</span>
                  <span class="detail-value">${new Date(checkInDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Check-out Date:</span>
                  <span class="detail-value">${new Date(checkOutDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Number of Guests:</span>
                  <span class="detail-value">${guests}</span>
                </div>
                
                <div class="detail-row" style="border-bottom: none;">
                  <span class="detail-label">Contact Number:</span>
                  <span class="detail-value">${contact}</span>
                </div>
              </div>
              
              <p><strong>What's Next?</strong></p>
              <p>Our team will review your reservation and contact you within 24 hours to confirm availability and finalize your booking.</p>
              
              <p>If you have any questions or need to make changes, please don't hesitate to reach out to us.</p>
              
              <p style="margin-top: 30px;">We look forward to welcoming you to our resort!</p>
              
              <p style="margin-top: 20px;">
                Warm regards,<br>
                <strong>Farmside Lakeside Resort Team</strong>
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">Farmside Lakeside Resort</p>
              <p style="margin: 5px 0;">Your Perfect Getaway Destination</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reservation-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
