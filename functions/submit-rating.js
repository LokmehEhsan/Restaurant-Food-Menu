exports.handler = async function(event, context) {
  // CORS: اگر درخواست preflight باشه، فقط هدر برگردون
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: 'OK',
    };
  }

  const { title, rating, comment } = JSON.parse(event.body || "{}");

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxV4D5K3FMHI4nklZnDTmidknCpL7ddQYVsu9O0Ftt69V1_F0hkN8XXk7lx_SKk36o/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, rating, comment })
    });

    const result = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // این مهم‌ترین خطه
      },
      body: JSON.stringify({ success: true, response: result })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // حتی در خطا هم باید باشه
      },
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
