
import { WhatsAppTemplate } from "@/lib/types/whatsapp-template";
import { v4 as uuidv4 } from "uuid";

export const mockTemplates: WhatsAppTemplate[] = [
  {
    id: uuidv4(),
    name: "Welcome Message",
    category: "Text",
    status: "Approved",
    createdAt: "2024-07-15T10:30:00Z",
    updatedAt: "2024-07-15T10:30:00Z",
    languages: {
      English: {
        body: "Hello {{name}}! Welcome to our service. We're excited to have you on board.",
        footer: "Reply STOP to unsubscribe",
        buttons: [
          {
            id: uuidv4(),
            type: "url",
            text: "Visit Website",
            url: "https://example.com"
          },
          {
            id: uuidv4(),
            type: "quick_reply",
            text: "Get Started"
          }
        ]
      },
      Hindi: {
        body: "नमस्ते {{name}}! हमारी सेवा में आपका स्वागत है। हमें आपको यहां देखकर खुशी हुई।",
        footer: "सदस्यता समाप्त करने के लिए STOP जवाब दें",
        buttons: [
          {
            id: uuidv4(),
            type: "url",
            text: "वेबसाइट देखें",
            url: "https://example.com"
          },
          {
            id: uuidv4(),
            type: "quick_reply",
            text: "शुरू करें"
          }
        ]
      }
    }
  },
  {
    id: uuidv4(),
    name: "Order Confirmation",
    category: "Media",
    status: "Approved",
    createdAt: "2024-07-10T14:20:00Z",
    updatedAt: "2024-07-12T09:15:00Z",
    languages: {
      English: {
        header: "Order Confirmed!",
        body: "Thank you for your order, {{name}}! Your order #{{order_id}} has been confirmed and is being processed.",
        footer: "Need help? Contact our support team.",
        mediaUrl: "https://placehold.co/600x400",
        mediaType: "image",
        buttons: [
          {
            id: uuidv4(),
            type: "url",
            text: "Track Order",
            url: "https://example.com/track"
          }
        ]
      },
      Spanish: {
        header: "¡Pedido Confirmado!",
        body: "Gracias por tu pedido, {{name}}! Tu pedido #{{order_id}} ha sido confirmado y está siendo procesado.",
        footer: "¿Necesitas ayuda? Contacta a nuestro equipo de soporte.",
        mediaUrl: "https://placehold.co/600x400",
        mediaType: "image",
        buttons: [
          {
            id: uuidv4(),
            type: "url",
            text: "Seguir Pedido",
            url: "https://example.com/track"
          }
        ]
      }
    }
  },
  {
    id: uuidv4(),
    name: "Product Showcase",
    category: "Carousel",
    status: "Pending",
    createdAt: "2024-07-05T11:30:00Z",
    updatedAt: "2024-07-05T11:30:00Z",
    languages: {
      English: {
        header: "Check out our latest products!",
        body: "Hello {{name}}, we thought you might be interested in these items:",
        carouselItems: [
          {
            id: uuidv4(),
            title: "Premium Headphones",
            description: "Wireless noise-cancelling headphones with 30h battery life",
            imageUrl: "https://placehold.co/600x400/2563eb/white?text=Headphones",
            buttons: [
              {
                id: uuidv4(),
                type: "url",
                text: "View Details",
                url: "https://example.com/headphones"
              }
            ]
          },
          {
            id: uuidv4(),
            title: "Smart Watch",
            description: "Track your fitness and stay connected with our latest smartwatch",
            imageUrl: "https://placehold.co/600x400/059669/white?text=Smartwatch",
            buttons: [
              {
                id: uuidv4(),
                type: "url",
                text: "View Details",
                url: "https://example.com/smartwatch"
              }
            ]
          },
          {
            id: uuidv4(),
            title: "Bluetooth Speaker",
            description: "Waterproof speaker with incredible sound quality",
            imageUrl: "https://placehold.co/600x400/9333ea/white?text=Speaker",
            buttons: [
              {
                id: uuidv4(),
                type: "url",
                text: "View Details",
                url: "https://example.com/speaker"
              }
            ]
          }
        ]
      }
    }
  },
  {
    id: uuidv4(),
    name: "Payment Reminder",
    category: "Text",
    status: "Approved",
    createdAt: "2024-06-28T09:45:00Z",
    updatedAt: "2024-06-28T09:45:00Z",
    languages: {
      English: {
        body: "Hi {{name}}, this is a reminder that your payment of {{amount}} is due on {{date}}. Please ensure timely payment to avoid any service interruption.",
        footer: "Reply HELP for assistance",
        buttons: [
          {
            id: uuidv4(),
            type: "url",
            text: "Pay Now",
            url: "https://example.com/pay"
          }
        ]
      }
    },
    isArchived: true
  },
  {
    id: uuidv4(),
    name: "Appointment Reminder",
    category: "Text",
    status: "Rejected",
    createdAt: "2024-06-20T16:30:00Z",
    updatedAt: "2024-06-22T10:15:00Z",
    languages: {
      English: {
        body: "Hello {{name}}, this is a reminder for your appointment scheduled on {{date}} at {{time}}. Please reply YES to confirm or NO to reschedule.",
        footer: "Reply STOP to unsubscribe",
        buttons: [
          {
            id: uuidv4(),
            type: "quick_reply",
            text: "Confirm"
          },
          {
            id: uuidv4(),
            type: "quick_reply",
            text: "Reschedule"
          }
        ]
      }
    }
  },
  {
    id: uuidv4(),
    name: "Shipping Update",
    category: "Order Status",
    status: "Approved",
    createdAt: "2024-07-01T13:20:00Z",
    updatedAt: "2024-07-01T13:20:00Z",
    languages: {
      English: {
        header: "Shipping Update",
        body: "Good news, {{name}}! Your order #{{order_id}} has been shipped and is on its way to you. Estimated delivery date: {{delivery_date}}.",
        footer: "Track your package for the latest updates.",
        buttons: [
          {
            id: uuidv4(),
            type: "url",
            text: "Track Package",
            url: "https://example.com/track"
          }
        ]
      }
    }
  }
];
