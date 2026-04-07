import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с контактной формы на email куратора платформы КотоДом"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not email or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все поля'})
        }

    smtp_to = os.environ.get('SMTP_TO_EMAIL', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    smtp_from = smtp_to

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'КотоДом: новая заявка от {name}'
    msg['From'] = smtp_from
    msg['To'] = smtp_to

    html = f"""
    <html><body style="font-family: sans-serif; color: #222; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #111;">🐱 Новая заявка с КотоДом</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #555; width: 100px;"><b>Имя</b></td><td style="padding: 8px 0;">{name}</td></tr>
        <tr><td style="padding: 8px 0; color: #555;"><b>Email</b></td><td style="padding: 8px 0;"><a href="mailto:{email}">{email}</a></td></tr>
      </table>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;">
      <p style="color: #555; margin-bottom: 4px;"><b>Сообщение:</b></p>
      <p style="background: #f9f9f9; padding: 16px; border-radius: 8px; line-height: 1.6;">{message}</p>
      <p style="color: #aaa; font-size: 12px; margin-top: 24px;">Письмо отправлено автоматически с сайта КотоДом</p>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(smtp_from, smtp_password)
        server.sendmail(smtp_from, smtp_to, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
