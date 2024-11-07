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
