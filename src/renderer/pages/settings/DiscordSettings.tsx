import React, { useEffect, useState } from 'react';
import { Button, Input, Switch, Select } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';

/**
 * Discord Settings Page
 *
 * This page provides configuration options for integrating a Discord bot into AionUI. Users can
 * configure the bot token, activation mode, default reply behavior, and other settings. Initially
 * this page serves as a placeholder for future Discord integration features. Hooks are in place
 * for saving settings to local storage or sending them to the Electron main process.
 */
const DiscordSettings: React.FC = () => {
  const { t } = useTranslation();

  // Example state variables for placeholder settings
  const [botToken, setBotToken] = useState('');
  const [activationMode, setActivationMode] = useState('off');
  const [autoReply, setAutoReply] = useState(false);

  // Effect placeholder for loading existing settings (e.g., from config or IPC)
  useEffect(() => {
    // TODO: Load saved Discord configuration from storage or main process service
  }, []);

  // Handler for saving settings
  const handleSave = () => {
    // TODO: Persist the Discord settings via IPC to main process service
    console.log('Saving Discord settings', { botToken, activationMode, autoReply });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{t('settings.discord.title', { defaultValue: 'Discord Settings' })}</h2>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>
          {t('settings.discord.botToken', { defaultValue: 'Bot Token' })}
        </label>
        <Input.Password
          placeholder={t('settings.discord.botTokenPlaceholder', { defaultValue: 'Enter your Discord bot token' })}
          value={botToken}
          onChange={setBotToken}
          allowClear
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>
          {t('settings.discord.activationMode', { defaultValue: 'Activation Mode' })}
        </label>
        <Select
          value={activationMode}
          onChange={setActivationMode}
          options={[
            { value: 'off', label: t('settings.discord.mode.off', { defaultValue: 'Off' }) },
            { value: 'mention', label: t('settings.discord.mode.mention', { defaultValue: 'Mention' }) },
            { value: 'keyword', label: t('settings.discord.mode.keyword', { defaultValue: 'Keyword' }) },
            { value: 'auto', label: t('settings.discord.mode.auto', { defaultValue: 'Auto' }) },
          ]}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>
          {t('settings.discord.autoReply', { defaultValue: 'Auto Reply' })}
        </label>
        <Switch checked={autoReply} onChange={setAutoReply} />
      </div>
      <Button type="primary" onClick={handleSave}>
        {t('common.save', { defaultValue: 'Save' })}
      </Button>
    </div>
  );
};

export default DiscordSettings;
