const { google } = require('googleapis');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const { name, phone } = JSON.parse(event.body);

    if (!name || !phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'نام یا شماره تماس وارد نشده است' })
      };
    }

    // =================== احراز هویت Google Sheets API ===================
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: 'PROJECT_ID',
        private_key_id: 'PRIVATE_KEY_ID',
        private_key: '-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY\\n-----END PRIVATE KEY-----\\n',
        client_email: 'YOUR_SERVICE_ACCOUNT_EMAIL',
        client_id: 'CLIENT_ID',
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = '18Qo9cQGkiniEc-fdb-_6iCApxz8aMRmRVvDzIAjXqes'; // آیدی گوگل شیتت
    const range = 'cantact'; // محدوده‌ای که اطلاعات وارد میشه

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[new Date().toISOString(), name, phone]]
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'اطلاعات با موفقیت ثبت شد' })
    };

  } catch (err) {
    console.error('خطا:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'خطا در ارسال اطلاعات به Google Sheets' })
    };
  }
};
