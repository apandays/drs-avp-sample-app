export enum RecommendationReason {
  BotByDeviceData = 'bot_by_device_data',
  EmulatedGraphicCard = 'emulated_graphic_card',
  HighActionVelocityPerDevice = 'high_action_velocity_per_device',
  HostingAsn = 'hosting_asn',
  ImpossibleTravel = 'impossible_travel',
  LanguageIpMismatch = 'language_ip_mismatch',
  MoreThanOneBrowserNamePerDevice = 'more_than_one_browser_name_per_device',
  MoreThanOnePlatformPerDevice = 'more_than_one_platform_per_device',
  NewDevice = 'new_device',
  NewDeviceSameType = 'new_device_same_type',
  NewDeviceSameTypeDiffBrowser = 'new_device_same_type_diff_browser',
  NewLocation = 'new_location',
  NoMousemoveBeforeClick = 'no_mousemove_before_click',
  RdcByMouseMoveLatency = 'rdc_by_mouse_move_latency',
}

export enum ActionType {
  Login = 'login',
  Logout = 'logout',
  Register = 'register',
  Transaction = 'transaction',
  PasswordReset = 'password_reset',
  Authenticated = 'authenticated',
}

export enum RecommendationType {
  ALLOW = 'ALLOW',
  CHALLENGE = 'CHALLENGE',
  DENY = 'DENY',
  TRUST = 'TRUST',
}

export interface RecommendationContext {
  action_id: string;
  action_performed_at: number;
  action_type: ActionType;
  application_id: string;
  client_id: string;
  correlation_id?: string;
  device_fingerprint: string;
  device_id: string;
  tenant_id: string;
  user_id?: string;
  location?: string;
  ip?: string;
  ip_country?: string;
  ip_asn_name?: string;
  ip_asn_id?: string;
  os_name?: string;
  browser_name?: string;
  user_agent?: string;
  ip_domain?: string;
  ip_location_city?: string;
  ip_location_latitude?: string;
  ip_location_longitude?: string;
  ip_location_region?: string;
  ip_location_timezone?: string;
  ip_location_zip?: string;
  ip_organization_name?: string;
  ip_organization_type?: string;
  device_platform?: string;
  device_timezone?: string;
}

export interface RecommendationRiskSignals {
  device: {
    incognito?: boolean;
    private_browser?: boolean;
    tampered?: boolean;
    emulated?: boolean;
    spoofed?: boolean;
    tz_mismatch?: boolean;
  };
  network: {
    vpn?: boolean;
    tor?: boolean;
    hosting?: boolean;
    proxy?: boolean;
    anonymizer?: boolean;
  };
  behavior: {
    typing_velocity?: number;
    input_method?: string[];
    no_user_interaction?: boolean;
  };
  history: {
    ip_action_rate_60_sec?: number;
    user_action_rate_60_sec?: number;
    device_action_rate_60_sec?: number;
    ip_user_count_last_hour?: number;
    linking_user_to_device_count?: number;
    linking_device_to_users_count?: number;
    ip_device_count_last_hour?: number;
  };
}

export type Recommendation =
  | { type: RecommendationType.CHALLENGE; data: RecommendationData }
  | {
      type: RecommendationType.ALLOW | RecommendationType.DENY | RecommendationType.TRUST;
    };

export type RecommendationData = {
  bindid_client_id?: string; // for bindid & bindid_api challenges
  bindid_url?: string; // for bindid & bindid_api challenges
  reference_id?: string; // uses as "nonce" for bindid hosted challenges
};

export interface PreviewRule {
  rule_name: string;
  recommendation: RecommendationType;
}

export interface RecommendationResult {
  id: string;
  issued_at: number;
  recommendation: Recommendation;
  risk_score: number;
  context: RecommendationContext;
  risk_signals: RecommendationRiskSignals;
  reasons: RecommendationReason[];
  preview_rule?: PreviewRule;
}

