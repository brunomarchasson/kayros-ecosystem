#pragma once

#ifdef MATHLIBRARY_EXPORTS
#define KAYROSAPILIBRARY_API __declspec(dllexport)
#else
#define KAYROSAPILIBRARY_API __declspec(dllimport)
#endif
#include <string>

extern "C++" KAYROSAPILIBRARY_API std::wstring hello();
extern "C++" KAYROSAPILIBRARY_API void setApiUrl(std::wstring url);
extern "C++" KAYROSAPILIBRARY_API std::wstring getQrCode(std::wstring data);
extern "C++" KAYROSAPILIBRARY_API std::wstring getTempFileName();
