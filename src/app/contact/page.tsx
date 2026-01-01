"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Stack,
  Autocomplete
} from "@mui/material";
import { Send, Email, Phone, Schedule, ArrowDropDown } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useBackground } from "@/context/BackgroundContext";

const MotionCard = motion(Card);

// Countries with flags and codes - Complete list
interface CountryType {
  code: string;
  label: string;
  phone: string;
}

const COUNTRIES: readonly CountryType[] = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  { code: 'AE', label: 'United Arab Emirates', phone: '971' },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AT', label: 'Austria', phone: '43' },
  { code: 'AU', label: 'Australia', phone: '61' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  { code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BN', label: 'Brunei', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  { code: 'CA', label: 'Canada', phone: '1' },
  { code: 'CD', label: 'Congo (DRC)', phone: '243' },
  { code: 'CF', label: 'Central African Republic', phone: '236' },
  { code: 'CG', label: 'Congo', phone: '242' },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  { code: 'DE', label: 'Germany', phone: '49' },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  { code: 'DO', label: 'Dominican Republic', phone: '1-809' },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  { code: 'FR', label: 'France', phone: '33' },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IN', label: 'India', phone: '91' },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  { code: 'IR', label: 'Iran', phone: '98' },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  { code: 'JP', label: 'Japan', phone: '81' },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  { code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
  { code: 'KP', label: 'North Korea', phone: '850' },
  { code: 'KR', label: 'South Korea', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  { code: 'LA', label: 'Laos', phone: '856' },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  { code: 'MD', label: 'Moldova', phone: '373' },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MK', label: 'North Macedonia', phone: '389' },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russia', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  { code: 'SY', label: 'Syria', phone: '963' },
  { code: 'SZ', label: 'Eswatini', phone: '268' },
  { code: 'TD', label: 'Chad', phone: '235' },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  { code: 'TT', label: 'Trinidad and Tobago', phone: '1-868' },
  { code: 'TW', label: 'Taiwan', phone: '886' },
  { code: 'TZ', label: 'Tanzania', phone: '255' },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  { code: 'US', label: 'United States', phone: '1' },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  { code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784' },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];

export default function ContactPage() {
  const { currentTheme } = useBackground();
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    COUNTRIES.find(c => c.code === 'IN') || null
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: selectedCountry ? `+${selectedCountry.phone} ${formData.mobile}` : formData.mobile,
          message: formData.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setSelectedCountry(COUNTRIES.find(c => c.code === 'IN') || null);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          message: ""
        });
      } else {
        setError(data.message || "Failed to send message");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#020617", minHeight: "100vh", pt: { xs: 12, md: 15 }, pb: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "4rem" },
              background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Get in Touch
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: "700px", mx: "auto" }}>
            Have a project in mind? Let&apos;s discuss how we can help you achieve your goals.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionCard
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              sx={{
                bgcolor: "rgba(30, 41, 59, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 4
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "white", mb: 3 }}>
                  Send us a Message
                </Typography>

                {success && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Message sent successfully! We&apos;ll get back to you soon.
                  </Alert>
                )}

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        sx={{
                          "& .MuiInputBase-root": { color: "white" },
                          "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        sx={{
                          "& .MuiInputBase-root": { color: "white" },
                          "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {/* Country Code Autocomplete */}
                        <Autocomplete
                          value={selectedCountry}
                          onChange={(_, newValue) => setSelectedCountry(newValue)}
                          options={COUNTRIES}
                          autoHighlight
                          getOptionLabel={(option) => `+${option.phone}`}
                          renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                              <Box
                                key={option.code}
                                component="li"
                                sx={{
                                  '& > img': { mr: 1.5, flexShrink: 0 },
                                  color: 'white !important'
                                }}
                                {...optionProps}
                              >
                                <img
                                  loading="lazy"
                                  width="24"
                                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                  alt=""
                                  style={{ borderRadius: '2px' }}
                                />
                                {option.label} +{option.phone}
                              </Box>
                            );
                          }}
                          renderInput={(params) => {
                            const { InputProps, ...restParams } = params;
                            return (
                              <TextField
                                {...restParams}
                                label="Country"
                                slotProps={{
                                  htmlInput: {
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                  },
                                }}
                                InputProps={{
                                  ...InputProps,
                                  startAdornment: selectedCountry ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 0.5, ml: 0.5 }}>
                                      <img
                                        loading="lazy"
                                        width="24"
                                        srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                                        alt=""
                                        style={{ borderRadius: '2px' }}
                                      />
                                    </Box>
                                  ) : null,
                                }}
                                sx={{
                                  minWidth: 180,
                                  "& .MuiInputBase-root": { color: "white" },
                                  "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                }}
                              />
                            );
                          }}
                          ListboxProps={{
                            style: {
                              maxHeight: '320px',
                              overflow: 'auto',
                            },
                            sx: {
                              bgcolor: '#1e293b',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              '& .MuiAutocomplete-option': {
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                                },
                                '&[aria-selected="true"]': {
                                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                                  '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                                  }
                                }
                              }
                            }
                          }}
                          sx={{
                            minWidth: 180,
                            '& .MuiOutlinedInput-root': {
                              color: 'white',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: currentTheme.primary,
                              }
                            },
                            '& .MuiAutocomplete-popupIndicator': {
                              color: 'rgba(255, 255, 255, 0.6)',
                            },
                            '& .MuiAutocomplete-clearIndicator': {
                              color: 'rgba(255, 255, 255, 0.6)',
                            }
                          }}
                        />

                        {/* Phone Number Input */}
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                          required
                          placeholder="Enter phone number"
                          sx={{
                            flex: 1,
                            "& .MuiInputBase-root": { color: "white" },
                            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        multiline
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        sx={{
                          "& .MuiInputBase-root": { color: "white" },
                          "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          textTransform: "none",
                          fontSize: "1.1rem"
                        }}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <MotionCard
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                sx={{
                  bgcolor: "rgba(30, 41, 59, 0.4)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 4
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: `${currentTheme.primary}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <Email sx={{ color: currentTheme.primary, fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
                        Email Us
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", wordBreak: "break-word" }}>
                        ipandeyakash@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>

              <MotionCard
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                sx={{
                  bgcolor: "rgba(30, 41, 59, 0.4)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 4
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: `${currentTheme.primary}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <Phone sx={{ color: currentTheme.primary, fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
                        Call Us
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        +91 XXX XXX XXXX
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>

              <MotionCard
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                sx={{
                  bgcolor: "rgba(30, 41, 59, 0.4)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 4
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: `${currentTheme.primary}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <Schedule sx={{ color: currentTheme.primary, fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
                        Business Hours
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        Mon - Fri: 9:00 AM - 6:00 PM
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
