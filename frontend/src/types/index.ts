export interface Promocao {
  titulo: string;
  descricao: string;
  valor_antigo: string;
  valor_promocional: string;
  validade: string;
  status: string;
}

export interface Video {
  id: string;
  titulo: string;
}

export interface FaqItem {
  id?: string;
  pergunta: string;
  resposta: string;
}

export interface CompanyConfig {
  name: string;
  address: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappUrl: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
  };
  cnpj: string;
  youtubeChannelUrl: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    youtube: string;
    instagram: string;
  };
}
