from apiclient.discovery import build
import io
from googleapiclient.http import MediaIoBaseDownload
from oauth2client.service_account import ServiceAccountCredentials

SCOPES = ['https://www.googleapis.com/auth/drive']

credentials = ServiceAccountCredentials.from_json_keyfile_name(
    'drive_credentials.json', scopes=SCOPES)

service = build('drive', 'v3', credentials=credentials)


def list_gdrive_content():
    results = service.files().list(
        pageSize=10, fields="nextPageToken, files(id, name)").execute()
    items = results.get('files', [])
    return items


def download_gdrive_file(filename, destination_folder='data'):
    items = list_gdrive_content()
    file = [i for i in items if i['name'] == filename][0]
    request = service.files().get_media(fileId=file['id'])
    # this can be used to write to disk
    fh = io.FileIO(destination_folder + '/' + filename, 'wb')
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()
        print("Download %d%%." % int(status.progress() * 100))
