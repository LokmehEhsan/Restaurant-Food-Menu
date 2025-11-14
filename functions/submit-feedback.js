const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async function(event, context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { title, comment, timestamp, language } = JSON.parse(event.body);
    
    // ذخیره در Google Sheets (اختیاری)
    // یا می‌توانید فقط در console لاگ کنید
    console.log('📝 نظر جدید:', {
      title,
      comment, 
      timestamp,
      language
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'success',
        message: 'نظر با موفقیت ثبت شد'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: error.message
      })
    };
  }
};
