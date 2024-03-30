from flask import Flask, jsonify
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

app = Flask(__name__)

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly", ""]


def get_gmail_service():
    """Retrieve Gmail service"""
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    return build("gmail", "v1", credentials=creds)


@app.route('/emails')
def get_emails():
    """Fetch and return emails"""
    try:
        gmail_service = get_gmail_service()
        results = gmail_service.users().messages().list(userId="me").execute()
        messages = results.get("messages", [])
        emails = []
        if messages:
            for message in messages:
                msg = gmail_service.users().messages().get(userId="me", id=message["id"]).execute()
                emails.append({
                    "id": msg["id"],
                    "subject": msg["snippet"],
                    "from": msg["payload"]["headers"][1]["value"] if len(msg["payload"]["headers"]) > 1 else "Unknown"
                })
        return jsonify(emails)
    except HttpError as error:
        return jsonify({"error": str(error)})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
