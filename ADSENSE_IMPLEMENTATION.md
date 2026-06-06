# Google AdSense Implementation Guide

## Quick Start

This guide provides step-by-step instructions to integrate Google AdSense into the Image & PDF Converter website.

---

## Step 1: Get Your AdSense Publisher ID

1. Visit https://www.google.com/adsense/
2. Click "Sign Up Now" and sign in with your Google account
3. Enter your website URL: `https://image-pdf-converter.com`
4. Complete the application process
5. Once approved, you'll receive a **Publisher ID** in the format: `ca-pub-XXXXXXXXXXXXXXXX`

---

## Step 2: Update the AdSense Script in index.html

Replace the placeholder in `client/index.html`:

```html
<!-- BEFORE (placeholder) -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"></script>

<!-- AFTER (with your actual Publisher ID) -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"></script>
```

---

## Step 3: Create Ad Units in AdSense Dashboard

1. Log in to your AdSense account
2. Navigate to **Ads & Services** → **Ad units**
3. Click **Create new ad unit**
4. Choose ad type (Display, In-article, or Matched content)
5. Configure ad settings
6. Copy the provided ad code

---

## Step 4: Add Display Ads to Home Page

Create a new component `client/src/components/AdSense.tsx`:

```tsx
import { useEffect } from 'react';

interface AdSenseProps {
  slotId: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  fullWidth?: boolean;
}

export function AdSense({ slotId, format = 'auto', fullWidth = true }: AdSenseProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive={fullWidth.toString()}
    />
  );
}
```

---

## Step 5: Place Ads in Home.tsx

Add the following ad placements in `client/src/pages/Home.tsx`:

### Ad Placement 1: After Hero Section
```tsx
import { AdSense } from "@/components/AdSense";

// In the Home component, after the main converter section:
<section className="bg-white py-8 border-t border-gray-100">
  <div className="container mx-auto px-4">
    <AdSense slotId="YOUR_AD_SLOT_ID_1" />
  </div>
</section>
```

### Ad Placement 2: Between Features and How It Works
```tsx
<section className="bg-gray-50 py-8 border-t border-gray-100">
  <div className="container mx-auto px-4">
    <AdSense slotId="YOUR_AD_SLOT_ID_2" />
  </div>
</section>
```

### Ad Placement 3: Before Footer
```tsx
<section className="bg-white py-8 border-t border-gray-100">
  <div className="container mx-auto px-4">
    <AdSense slotId="YOUR_AD_SLOT_ID_3" />
  </div>
</section>
```

---

## Step 6: Configure Ad Sizes

### Recommended Ad Sizes

**Desktop:**
- Leaderboard: 728x90px
- Medium Rectangle: 300x250px
- Wide Skyscraper: 160x600px

**Mobile:**
- Mobile Banner: 320x50px
- Mobile Medium Rectangle: 300x250px
- Mobile Leaderboard: 320x100px

**Responsive:**
- Auto-responsive (recommended)
- Adapts to device size

---

## Step 7: Test Your Ads

### Using Google AdSense Test Ads

To test ads without affecting your account:

1. Add this code to your browser console:
```javascript
window.adsbygoogle.push({
  google_ad_client: "ca-pub-xxxxxxxxxxxxxxxx",
  enable_page_level_ads: true
});
```

2. Or use test ad slot IDs:
```
ca-pub-3940256099942544 (test publisher ID)
6300978111 (test ad slot)
```

### Monitoring Performance

1. Log in to AdSense dashboard
2. Check **Performance Reports**
3. Monitor metrics:
   - Impressions
   - Clicks
   - Click-Through Rate (CTR)
   - Cost Per Click (CPC)
   - Estimated Earnings

---

## Step 8: Optimize Ad Performance

### Best Practices

1. **Ad Placement:**
   - Place ads above the fold (visible without scrolling)
   - Use natural content breaks
   - Avoid cluttering the page

2. **Ad Format:**
   - Use responsive ads for better performance
   - Test different sizes
   - Monitor which formats perform best

3. **Content Quality:**
   - Ensure high-quality, original content
   - Update content regularly
   - Focus on user experience

4. **Traffic Quality:**
   - Drive organic traffic through SEO
   - Avoid artificial traffic
   - Build genuine audience

### A/B Testing

1. Test different ad placements
2. Monitor performance metrics
3. Keep high-performing placements
4. Remove underperforming ads

---

## Step 9: Compliance and Policies

### Important Policies

1. **Content Policy:**
   - No adult content
   - No violence or hate speech
   - No copyright infringement
   - No misleading content

2. **Ad Placement Policy:**
   - Ads must be clearly distinguishable
   - No ads in pop-ups or pop-unders
   - No ads in floating boxes
   - Proper ad labeling required

3. **Traffic Policy:**
   - No artificial traffic generation
   - No click fraud
   - No incentivized clicks
   - No automated traffic

4. **Prohibited Content:**
   - Copyrighted material
   - Hacked content
   - Malware or viruses
   - Illegal content

### Compliance Checklist

- [ ] Website has original content
- [ ] Privacy Policy is present
- [ ] Terms of Service are present
- [ ] No prohibited content
- [ ] No artificial traffic
- [ ] Ads are clearly labeled
- [ ] Website is mobile-friendly
- [ ] HTTPS/SSL is enabled

---

## Step 10: Monitor and Optimize

### Key Metrics to Track

1. **Traffic Metrics:**
   - Monthly Unique Visitors
   - Page Views
   - Bounce Rate
   - Average Session Duration

2. **AdSense Metrics:**
   - Impressions
   - Clicks
   - CTR (Click-Through Rate)
   - CPC (Cost Per Click)
   - RPM (Revenue Per Mille)

3. **Revenue Metrics:**
   - Estimated Earnings
   - Total Earnings
   - Payment Status

### Tools for Monitoring

1. **Google AdSense Dashboard:**
   - Real-time performance data
   - Earnings reports
   - Ad unit performance
   - Policy violation alerts

2. **Google Analytics:**
   - User behavior tracking
   - Traffic source analysis
   - User demographics
   - Conversion tracking

3. **Google Search Console:**
   - Search performance
   - Keyword rankings
   - Indexing status
   - Crawl errors

---

## Troubleshooting

### Common Issues

**Issue: Ads not displaying**
- Solution: Check Publisher ID is correct
- Verify ad slot ID is valid
- Ensure website is approved by AdSense
- Check browser console for errors

**Issue: Low CTR (Click-Through Rate)**
- Solution: Optimize ad placements
- Improve content relevance
- Increase traffic quality
- Test different ad sizes

**Issue: Low CPC (Cost Per Click)**
- Solution: Target higher-value keywords
- Improve content quality
- Attract premium traffic
- Focus on niche topics

**Issue: AdSense Approval Denied**
- Solution: Ensure original content
- Add Privacy Policy and Terms
- Wait 3-6 months and reapply
- Check policy compliance

---

## Additional Resources

- AdSense Help Center: https://support.google.com/adsense
- AdSense Policies: https://support.google.com/adsense/answer/48182
- Google Ads API: https://developers.google.com/google-ads/api
- AdSense Success Stories: https://www.google.com/adsense/success-stories

---

## Support

For questions or issues:
1. Check AdSense Help Center
2. Review AdSense Policies
3. Contact AdSense Support
4. Join AdSense Community Forums

---

**Last Updated:** June 6, 2026
