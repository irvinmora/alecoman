export interface Worker {
  id: string;
  name: string;
  role: string;
  photo: string;
  description: string;
  active: boolean;
  isOwner?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  date: string;
  featured: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  date: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'viewer';
}
