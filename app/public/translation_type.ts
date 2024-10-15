// types.ts
export interface Translations {
  navbarTitle: string;
  selectLanguage: string;
  title: string;
  uploadPhoto: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  selectDistrict: string;
  selectTaluka: string;
  selectBranch: string;
  message: string;
  submit: string;
  copyright: string;
  
  // New keys added
  location?: string;        // Optional key for location
  scanQR?: string;         // Optional key for scanning QR code
  joinWhatsApp?: string;   // Optional key for joining WhatsApp group
}

export interface LanguageTranslations {
  [key: string]: Translations; 
}