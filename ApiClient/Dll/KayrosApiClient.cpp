
#include "pch.h"
#include "KayrosApiClient.h"
#include <Urlmon.h>
#pragma comment(lib, "Urlmon.lib") 


// DLL internal state variables:
static std::wstring apiUrl = L"http://localhost:8000";

void setApiUrl(std::wstring url)
{
  apiUrl = url;
}

std::wstring hello()
{
  return L"Testé";
}

std::wstring getQrCode(std::wstring data)
{
  std::wstring endPoint = L"/api/tools/qrcode";
  std::wstring params = L"?data=" + data;
  std::wstring url = apiUrl + endPoint + params;

  std::wstring filePath = getTempFileName()+L".png";
  
  HRESULT hr = URLDownloadToFile(
    NULL,   
    url.c_str(),
    filePath.c_str(),
    0,
    NULL);
  if (SUCCEEDED(hr))
  {
    return filePath;
  }
  else
  {
    throw ("An error occured : error code = 0x")+ hr;
  }

  return 0;
}

std::wstring getTempFileName()
{
  TCHAR lpTempPathBuffer[MAX_PATH];
  TCHAR szTempFileName[MAX_PATH];
  DWORD dwRetVal = 0;
  UINT uRetVal = 0;
  HANDLE hFile = INVALID_HANDLE_VALUE;
  HANDLE hTempFile = INVALID_HANDLE_VALUE;
  //  Gets the temp path env string (no guarantee it's a valid path).
  dwRetVal = GetTempPath(MAX_PATH,          // length of the buffer
    lpTempPathBuffer); // buffer for path 
  if (dwRetVal > MAX_PATH || (dwRetVal == 0))
  {
    // PrintError(TEXT("GetTempPath failed"));
    if (!CloseHandle(hFile))
    {
      // PrintError(TEXT("CloseHandle(hFile) failed"));
      throw (7);
    }
    throw (2);
  }

  //  Generates a temporary file name. 
  uRetVal = GetTempFileName(lpTempPathBuffer, // directory for tmp files
    TEXT("DEMO"),     // temp file name prefix 
    0,                // create unique name 
    szTempFileName);  // buffer for name 
  if (uRetVal == 0)
  {
    // PrintError(TEXT("GetTempFileName failed"));
    if (!CloseHandle(hFile))
    {
      // PrintError(TEXT("CloseHandle(hFile) failed"));
      throw (7);
    }
    throw (3);
  }
  return szTempFileName;
}
