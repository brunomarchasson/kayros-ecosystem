// ApiClientTest.cpp : Ce fichier contient la fonction 'main'. L'exécution du programme commence et se termine à cet endroit.
//

#include <locale>
#include <iostream>
#include <string>
#include "KayrosApiClient.h"
#include <io.h>
#include <Windows.h>


std::string WidestringToString(const std::wstring & wstr, const std::string & locale)
{
  if (wstr.empty())
  {
    return std::string();
  }
  size_t pos;
  size_t begin = 0;
  std::string ret;
  size_t  size;

  _locale_t lc = _create_locale(LC_ALL, locale.c_str());
  pos = wstr.find(static_cast<wchar_t>(0), begin);
  while (pos != std::wstring::npos && begin < wstr.length())
  {
    std::wstring segment = std::wstring(&wstr[begin], pos - begin);
    _wcstombs_s_l(&size, nullptr, 0, &segment[0], _TRUNCATE, lc);
    std::string converted = std::string(size, 0);
    _wcstombs_s_l(&size, &converted[0], size, &segment[0], _TRUNCATE, lc);
    ret.append(converted);
    begin = pos + 1;
    pos = wstr.find(static_cast<wchar_t>(0), begin);
  }
  if (begin <= wstr.length()) {
    std::wstring segment = std::wstring(&wstr[begin], wstr.length() - begin);
    _wcstombs_s_l(&size, nullptr, 0, &segment[0], _TRUNCATE, lc);
    std::string converted = std::string(size, 0);
    _wcstombs_s_l(&size, &converted[0], size, &segment[0], _TRUNCATE, lc);
    converted.resize(size - 1);
    ret.append(converted);
  }
  _free_locale(lc);

  return ret;
}

std::wstring StringToWideString(const std::string& str, const std::string& locale)
{
  if (str.empty())
  {
    return std::wstring();
  }

  size_t pos;
  size_t begin = 0;
  std::wstring ret;
  size_t  size;

  _locale_t lc = _create_locale(LC_ALL, locale.c_str());
  pos = str.find(static_cast<char>(0), begin);
  while (pos != std::string::npos) {
    std::string segment = std::string(&str[begin], pos - begin);
    std::wstring converted = std::wstring(segment.size() + 1, 0);
    _mbstowcs_s_l(&size, &converted[0], converted.size(), &segment[0], _TRUNCATE, lc);
    converted.resize(size - 1);
    ret.append(converted);
    ret.append({ 0 });
    begin = pos + 1;
    pos = str.find(static_cast<char>(0), begin);
  }
  if (begin < str.length()) {
    std::string segment = std::string(&str[begin], str.length() - begin);
    std::wstring converted = std::wstring(segment.size() + 1, 0);
    _mbstowcs_s_l(&size, &converted[0], converted.size(), &segment[0], _TRUNCATE, lc);
    converted.resize(size - 1);
    ret.append(converted);
  }
  _free_locale(lc);


  return ret;
}
int  wmain()
{
  try {


    std::wstring msg = hello();


    std::cout << WidestringToString(msg, "fr") << std::endl;
    std::wcout << getTempFileName() << std::endl;
    std::wcout << getQrCode(L"testQR;ee;zz") << std::endl;

  }
  catch (int i) {
    std::cout << ("error");
  }
}

// Exécuter le programme : Ctrl+F5 ou menu Déboguer > Exécuter sans débogage
// Déboguer le programme : F5 ou menu Déboguer > Démarrer le débogage

// Astuces pour bien démarrer : 
//   1. Utilisez la fenêtre Explorateur de solutions pour ajouter des fichiers et les gérer.
//   2. Utilisez la fenêtre Team Explorer pour vous connecter au contrôle de code source.
//   3. Utilisez la fenêtre Sortie pour voir la sortie de la génération et d'autres messages.
//   4. Utilisez la fenêtre Liste d'erreurs pour voir les erreurs.
//   5. Accédez à Projet > Ajouter un nouvel élément pour créer des fichiers de code, ou à Projet > Ajouter un élément existant pour ajouter des fichiers de code existants au projet.
//   6. Pour rouvrir ce projet plus tard, accédez à Fichier > Ouvrir > Projet et sélectionnez le fichier .sln.
