# 🔧 Dynamic Schema Setup Guide

This guide explains how to configure your headless WordPress blog with **automatic schema markup** that adapts to any domain without manual editing.

## 🚀 Quick Start

### 1. **Copy Environment Configuration**
```bash
cp env.example .env.local
```

### 2. **Configure Your Domain & Business Info**
Edit `.env.local` with your specific details:

```env
# Essential Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Business Name
NEXT_PUBLIC_ORG_NAME=Your Company Name
NEXT_PUBLIC_ORG_DESCRIPTION=Your business description
```

### 3. **Deploy & Done! 🎉**
Your schema markup will automatically use your domain and business information.

---

## 📋 Configuration Options

### **Required Settings**
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Your website URL | `https://jasakami.id` |
| `NEXT_PUBLIC_SITE_NAME` | Site name for SEO | `JasaKami.ID` |
| `NEXT_PUBLIC_ORG_NAME` | Organization name | `JasaKami.ID` |

### **Business Information**
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_ORG_DESCRIPTION` | Business description | `WordPress maintenance services` |
| `NEXT_PUBLIC_ORG_PHONE` | Contact phone | `+62-812-3456-7890` |
| `NEXT_PUBLIC_ORG_LOGO` | Logo path | `/logo.png` |
| `NEXT_PUBLIC_DEFAULT_IMAGE` | Default article image | `/default-image.jpg` |

### **Services Configuration**
| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SERVICE_1` | Primary service | `WordPress Migration` |
| `NEXT_PUBLIC_SERVICE_2` | Secondary service | `Malware Removal` |
| `NEXT_PUBLIC_SERVICE_3` | Third service | `VPS Setup` |
| `NEXT_PUBLIC_SERVICE_4` | Fourth service | `VPS Management` |

### **Social Media (Optional)**
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook page | `https://facebook.com/yourpage` |
| `NEXT_PUBLIC_TWITTER_URL` | Twitter profile | `https://twitter.com/youraccount` |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn company | `https://linkedin.com/company/yours` |

### **Localization**
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_LANGUAGE` | Language code | `id-ID` (Indonesian) |
| `NEXT_PUBLIC_SITE_COUNTRY` | Country name | `Indonesia` |

---

## 🌍 Multi-Domain Examples

### **English Tech Company**
```env
NEXT_PUBLIC_SITE_URL=https://techcorp.com
NEXT_PUBLIC_SITE_NAME=TechCorp Solutions
NEXT_PUBLIC_ORG_NAME=TechCorp Solutions
NEXT_PUBLIC_ORG_DESCRIPTION=Professional web development and digital solutions
NEXT_PUBLIC_SERVICE_1=Web Development
NEXT_PUBLIC_SERVICE_2=Mobile Apps
NEXT_PUBLIC_SERVICE_3=Digital Marketing
NEXT_PUBLIC_SERVICE_4=SEO Services
NEXT_PUBLIC_SITE_LANGUAGE=en-US
NEXT_PUBLIC_SITE_COUNTRY=United States
```

### **Indonesian WordPress Services**
```env
NEXT_PUBLIC_SITE_URL=https://jasakami.id
NEXT_PUBLIC_SITE_NAME=JasaKami.ID
NEXT_PUBLIC_ORG_NAME=JasaKami.ID
NEXT_PUBLIC_ORG_DESCRIPTION=Spesialis layanan pemeliharaan WordPress profesional di Indonesia
NEXT_PUBLIC_SERVICE_1=WordPress Migration
NEXT_PUBLIC_SERVICE_2=Malware Removal
NEXT_PUBLIC_SERVICE_3=VPS Setup
NEXT_PUBLIC_SERVICE_4=VPS Management
NEXT_PUBLIC_SITE_LANGUAGE=id-ID
NEXT_PUBLIC_SITE_COUNTRY=Indonesia
```

### **French Design Agency**
```env
NEXT_PUBLIC_SITE_URL=https://designagence.fr
NEXT_PUBLIC_SITE_NAME=Design Agence
NEXT_PUBLIC_ORG_NAME=Design Agence
NEXT_PUBLIC_ORG_DESCRIPTION=Agence de design créatif et développement web
NEXT_PUBLIC_SERVICE_1=Design Graphique
NEXT_PUBLIC_SERVICE_2=Développement Web
NEXT_PUBLIC_SERVICE_3=Branding
NEXT_PUBLIC_SERVICE_4=UX/UI Design
NEXT_PUBLIC_SITE_LANGUAGE=fr-FR
NEXT_PUBLIC_SITE_COUNTRY=France
```

---

## 🔍 Generated Schema Types

The system automatically generates these schema types:

### **1. BreadcrumbList Schema**
- ✅ Dynamic URLs based on your domain
- ✅ Category-aware navigation
- ✅ Proper hierarchy structure

### **2. Article Schema**
- ✅ Rich article metadata
- ✅ Author and publisher information
- ✅ Featured image handling
- ✅ Keywords from post tags
- ✅ Service mentions

### **3. Organization Schema**
- ✅ Business contact information
- ✅ Service offerings
- ✅ Social media profiles
- ✅ Geographic area served

### **4. WebPage Schema**
- ✅ Page-specific metadata
- ✅ Proper website hierarchy
- ✅ Image optimization
- ✅ Language specification

---

## 🛠 Advanced Customization

### **Custom Schema Generator**
Located in `src/lib/schema-generator.ts`, you can modify:

```typescript
// Add custom service schema
export function generateCustomServiceSchema(serviceName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "provider": {
      "@type": "Organization", 
      "name": env.schema.organization.name
    },
    "areaServed": env.schema.locale.country
  };
}
```

### **Environment Configuration**
Located in `src/config/environment.ts`, you can add:

```typescript
// Add new schema fields
export const env = {
  // ... existing config
  schema: {
    // ... existing schema config
    custom: {
      businessHours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || '9:00-17:00',
      certification: process.env.NEXT_PUBLIC_CERTIFICATION || '',
    }
  }
}
```

---

## ✅ Validation & Testing

### **Google Rich Results Test**
1. Deploy your site with environment variables
2. Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
3. Enter your single post URL: `https://yourdomain.com/post-slug`
4. Verify all schema types are detected ✅

### **Schema Markup Validator**
1. Visit [Schema.org Validator](https://validator.schema.org/)
2. Enter your post URL
3. Check for validation errors
4. Ensure all required fields are present

---

## 🚨 Common Issues & Solutions

### **Images Not Loading**
```env
# Use absolute URLs for external images
NEXT_PUBLIC_ORG_LOGO=https://yourdomain.com/logo.png
NEXT_PUBLIC_DEFAULT_IMAGE=https://yourdomain.com/default.jpg

# Or relative paths for local images
NEXT_PUBLIC_ORG_LOGO=/images/logo.png
NEXT_PUBLIC_DEFAULT_IMAGE=/images/default.jpg
```

### **Schema Validation Errors**
- ✅ Ensure `NEXT_PUBLIC_SITE_URL` matches your actual domain
- ✅ Check that all image URLs are accessible
- ✅ Verify phone number format: `+country-area-number`
- ✅ Confirm language code format: `en-US`, `id-ID`, etc.

### **Missing Social Media**
```env
# Leave empty if you don't have social profiles
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_TWITTER_URL=
NEXT_PUBLIC_LINKEDIN_URL=
```

---

## 🎯 Benefits

✅ **Zero Manual Editing** - Deploy to any domain without code changes  
✅ **SEO Optimized** - Rich snippets and better search visibility  
✅ **Multi-Language Support** - Configure for any language/country  
✅ **Business Focused** - Optimized for service-based businesses  
✅ **Google Validated** - Passes all Google Rich Results tests  
✅ **Maintenance Free** - Set once, works everywhere  

---

## 📞 Support

Need help setting up your schema? Check the examples above or review the configuration files:
- `src/config/environment.ts` - Environment configuration
- `src/lib/schema-generator.ts` - Schema generation logic
- `env.example` - Configuration examples 