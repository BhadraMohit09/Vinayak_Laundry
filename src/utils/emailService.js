const RESEND_API_KEY = 're_LQLCJZH1_3rZGmZdGkHZtkcKUkAFfNpCy';
const ADMIN_EMAIL = 'bhadramohit.cloud@gmail.com';
const SENDER_EMAIL = 'Siddhi Vinayak Laundry <onboarding@resend.dev>';

/**
 * Sends notification and confirmation emails using Resend API
 */
export async function sendFormEmails({ name, email, subject, message }) {
  if (!name || !email || !subject || !message) {
    throw new Error('All fields (name, email, subject, message) are required.');
  }

  // 1. HTML Template for Admin Notification
  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Inquiry - Siddhi Vinayak Laundry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #7C3AED, #3B82F6); padding: 35px 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">New Form Submission</h1>
      <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 15px;">Siddhi Vinayak Laundry Contact Portal</p>
    </div>
    
    <!-- Body -->
    <div style="padding: 32px 24px;">
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #7C3AED; margin-bottom: 24px;">
        <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px;">Customer Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 90px;">Name:</td>
            <td style="padding: 6px 0; color: #1e293b; font-weight: 500;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email:</td>
            <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #3B82F6; text-decoration: none; font-weight: 500;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Subject:</td>
            <td style="padding: 6px 0; color: #1e293b; font-weight: 500;">${subject}</td>
          </tr>
        </table>
      </div>

      <h2 style="margin: 0 0 12px 0; color: #1e293b; font-size: 18px;">Message Content</h2>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; color: #334155; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${message}</div>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 20px 24px; text-align: center; color: #64748b; font-size: 13px; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0;">You can reply directly to this notification to email the customer (<a href="mailto:${email}" style="color: #7C3AED; text-decoration: none;">${email}</a>).</p>
    </div>
  </div>
</body>
</html>
`;

  // 2. HTML Template for Client Confirmation
  const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You - Siddhi Vinayak Laundry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #3B82F6, #7C3AED); padding: 40px 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Thank You!</h1>
      <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">We have received your message</p>
    </div>
    
    <!-- Body -->
    <div style="padding: 32px 24px;">
      <p style="font-size: 16px; color: #1e293b; margin-top: 0; line-height: 1.6;">Hello <strong>${name}</strong>,</p>
      <p style="color: #475569; font-size: 15px; line-height: 1.6;">Thank you for contacting <strong>Siddhi Vinayak Laundry</strong>. We have received your inquiry regarding <em>"${subject}"</em>.</p>
      <p style="color: #475569; font-size: 15px; line-height: 1.6;">Our team is reviewing your message and will get back to you promptly—usually within a few business hours. We pride ourselves on top-tier laundry and dry cleaning services tailored to your needs.</p>
      
      <div style="margin: 28px 0; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Your Message Summary</p>
        <p style="margin: 0; color: #334155; font-style: italic; line-height: 1.5; font-size: 14px;">"${message}"</p>
      </div>

      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 0;">Need urgent assistance? Give us a call or WhatsApp us anytime at <a href="tel:+916351674100" style="color: #7C3AED; font-weight: 600; text-decoration: none;">+91 6351674100</a>.</p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #1e293b; padding: 24px; text-align: center; color: #94a3b8; font-size: 13px;">
      <p style="margin: 0 0 6px 0; color: #f8fafc; font-weight: 600; font-size: 15px;">Siddhi Vinayak Laundry</p>
      <p style="margin: 0;">Jamnagar, Gujarat, India</p>
    </div>
  </div>
</body>
</html>
`;

  // Send Admin Notification Email
  const adminResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: SENDER_EMAIL,
      to: [ADMIN_EMAIL],
      reply_to: email,
      subject: `New Inquiry: ${subject}`,
      html: adminHtml
    })
  });

  const adminResult = await adminResponse.json();

  if (!adminResponse.ok) {
    console.error('Resend Admin Email Error:', adminResult);
    throw new Error(adminResult.message || 'Failed to send admin notification email');
  }

  // Send Client Confirmation Email
  let clientResult = null;
  try {
    const clientResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [email],
        subject: `We received your message - Siddhi Vinayak Laundry`,
        html: clientHtml
      })
    });
    clientResult = await clientResponse.json();
    if (!clientResponse.ok) {
      console.warn('Note: Client confirmation mail returned non-200 (likely due to Resend sandbox domain restrictions):', clientResult);
    }
  } catch (clientErr) {
    console.warn('Could not send confirmation email to client:', clientErr);
  }

  return {
    success: true,
    adminEmailId: adminResult.id,
    clientEmailId: clientResult ? clientResult.id : null
  };
}
