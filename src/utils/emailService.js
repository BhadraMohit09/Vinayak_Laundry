const EMAILJS_SERVICE_ID = (typeof process !== 'undefined' && process.env && process.env.EMAILJS_SERVICE_ID) || 'service_bosuaeo';
const EMAILJS_OWNER_TEMPLATE_ID = (typeof process !== 'undefined' && process.env && process.env.EMAILJS_OWNER_TEMPLATE_ID) || 'template_n6y2shv';
const EMAILJS_CUSTOMER_TEMPLATE_ID = (typeof process !== 'undefined' && process.env && process.env.EMAILJS_CUSTOMER_TEMPLATE_ID) || 'template_nfsoy4r';
const EMAILJS_PUBLIC_KEY = (typeof process !== 'undefined' && process.env && process.env.EMAILJS_PUBLIC_KEY) || 'fWKmKeEqHy7Cz_Sim';
const EMAILJS_PRIVATE_KEY = (typeof process !== 'undefined' && process.env && process.env.EMAILJS_PRIVATE_KEY) || '';

/**
 * Sends notification and confirmation emails using EmailJS REST API
 */
export async function sendFormEmails(data) {
  const {
    name,
    phone,
    email,
    subject = 'Doorstep Pickup Booking',
    address,
    items,
    message
  } = data;

  if (!name || !phone || !email) {
    throw new Error('Name, phone number, and email are required.');
  }

  const serviceId = EMAILJS_SERVICE_ID.trim();
  const ownerTemplateId = EMAILJS_OWNER_TEMPLATE_ID.trim();
  const customerTemplateId = EMAILJS_CUSTOMER_TEMPLATE_ID.trim();
  const publicKey = EMAILJS_PUBLIC_KEY.trim();
  const privateKey = EMAILJS_PRIVATE_KEY.trim();

  if (!serviceId || !ownerTemplateId || !customerTemplateId || !publicKey) {
    throw new Error('Server Configuration Error: EmailJS IDs or Public Key are missing.');
  }

  // Construct structured detailed message content for templates that display {{message}}
  const messageParts = [];
  if (items && items.trim()) {
    messageParts.push(`Estimated Items / Clothes:\n${items.trim()}`);
  }
  if (address && address.trim()) {
    messageParts.push(`Pickup / Doorstep Address:\n${address.trim()}`);
  }
  if (message && message.trim() && message.trim() !== address?.trim() && message.trim() !== items?.trim()) {
    messageParts.push(`Additional Instructions / Message:\n${message.trim()}`);
  }

  const consolidatedMessage = messageParts.length > 0 
    ? messageParts.join('\n\n')
    : (message || address || items || 'No details provided');

  // We provide both individual variables (phone, user_phone, address, items)
  // AND ensure phone, address & items are in message, user_message, details, etc.
  // so no matter how the EmailJS template is mapped, owner always sees phone, items, address.
  const templateParams = {
    name,
    from_name: name,
    customer_name: name,
    phone,
    user_phone: phone,
    customer_phone: phone,
    contact_number: phone,
    mobile: phone,
    email,
    from_email: email,
    customer_email: email,
    reply_to: email,
    subject,
    address: address || '',
    items: items || '',
    details: consolidatedMessage,
    message: `Phone: ${phone}\n\n${consolidatedMessage}`
  };

  const basePayload = {
    service_id: serviceId,
    user_id: publicKey,
    template_params: templateParams
  };
  if (privateKey) {
    basePayload.accessToken = privateKey;
  }

  // 1. Send Owner Notification Email
  const ownerResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...basePayload,
      template_id: ownerTemplateId
    })
  });

  if (!ownerResponse.ok) {
    const errorText = await ownerResponse.text();
    console.error('EmailJS Owner Email Error:', errorText);
    throw new Error(`Failed to send message: ${errorText || 'EmailJS service error'}`);
  }

  // 2. Send Customer Auto-Reply Confirmation Email
  try {
    const customerResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...basePayload,
        template_id: customerTemplateId
      })
    });

    if (!customerResponse.ok) {
      const custErrText = await customerResponse.text();
      console.error('EmailJS Customer Auto-Reply Error:', custErrText);
    }
  } catch (clientErr) {
    console.error('Could not send confirmation email to customer:', clientErr);
  }

  return {
    success: true,
    message: 'Emails sent successfully via EmailJS'
  };
}
