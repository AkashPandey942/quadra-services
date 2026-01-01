# Email Configuration for Contact Form

## Environment Variables

Add these to your `.env.local` file:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security → App Passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Add it to `.env.local` as `EMAIL_PASSWORD`

## Testing

- Admin email: ipandeyakash@gmail.com
- User receives confirmation email at their submitted email address
- Both emails include formatted HTML templates

## Features

- ✅ Country code selector with flags
- ✅ Email validation
- ✅ Mobile number with country code
- ✅ Admin notification email
- ✅ User confirmation email
- ✅ Success/error messages
- ✅ Loading states
