export const LOGIN_STEP = Object.freeze({
  LOGIN_FORM: 'loginForm',
  VERIFY_2FA: 'verify2FA',
  PASSWORD_EXPIRED: 'passExpired',
  COMPANY_DETAILS: 'companyDetail',
  VERIFY_EMAIL: 'verifyEmail',
  ORGANIZATION_FORM: 'organizationForm',
});

export enum USER_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const IS_CACHING_ACTIVE = true;

export const NAME_BADGE_COLOR_COMBINATIONS = [
  {
    bgColor: 'ipBlue__transparentBG',
    Color: 'ip__Blue',
  },
  {
    bgColor: 'ipOrange__transparentBG',
    Color: 'ip__Orange',
  },
  {
    bgColor: 'ipGreen__transparentBG',
    Color: 'ip__Green',
  },
  {
    bgColor: 'ipRed__transparentBG',
    Color: 'ip__Red',
  },
  {
    bgColor: 'ipYellow__transparentBG',
    Color: 'ip__Yellow',
  },
  {
    bgColor: 'ipGray__transparentBG',
    Color: 'dark__TextColor',
  },
];