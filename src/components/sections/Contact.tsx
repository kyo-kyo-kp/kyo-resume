import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { MailOutline } from '@mui/icons-material';
import SectionShell from '../layout/SectionShell';
import Reveal from '../ui/Reveal';
import { useContent, useStrings } from '../../i18n/LocaleContext';

const Contact: React.FC = () => {
  const { profile } = useContent();
  const s = useStrings();
  return (
    <SectionShell id="contact" eyebrow={s.contact.eyebrow} title={s.contact.title} tone="paper">
      <Reveal>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
          {s.contact.body}
        </Typography>
        <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', mt: 3 }}>
          <Button variant="contained" startIcon={<MailOutline />} href={`mailto:${profile.email}`}>
            {s.contact.email}
          </Button>
          {profile.links.map((l) => (
            <Button key={l.label} variant="outlined" href={l.url} target="_blank" rel="noreferrer" sx={{ borderColor: 'divider', color: 'text.primary' }}>
              {l.label}
            </Button>
          ))}
        </Stack>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 2 }}>
          {profile.email} · {profile.location}
        </Typography>
      </Reveal>
    </SectionShell>
  );
};

export default Contact;
