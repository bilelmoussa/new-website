export type UserSessionType = {
    userId: string;
    sessionId: string;
    refreshToken: string;
    accessToken: string;
    userHash: string;
    userRole: number;
    logs: [Date];
    createdOn: Date;
    modifiedOn: Date;
}

/**
 * user session
 */
export class UserSession {
    public userId: string;
    public sessionId: string;
    public refreshToken: string;
    public accessToken: string;
    public userHash: string;
    public userRole: number;
    public logs: [Date];
    public createdOn: Date;
    public modifiedOn: Date;
    static error: string;
    /**
     * user session class constructor
     * @param {UserSessionType} userSessionInfo user session info
     * @param {Function} makeId generate session id
     * @param {Function} isValidId check if the id is valid
     * @param {Function} userSessionValidate validate user session info
     * @param {string} accessTokenSecret access Token secret
     * @param {string} refreshTokenSecret refresh Token secret
     * @param {Function} verifyToken check if tokens are valid
     */
    constructor(
        userSessionInfo: UserSessionType,
        makeId: Function,
        isValidId: Function,
        userSessionValidate: Function,
        accessTokenSecret: string,
        refreshTokenSecret: string,
        verifyToken: Function,
    ) {
      this.userId = userSessionInfo.userId || makeId();
      this.sessionId = userSessionInfo.sessionId;
      this.refreshToken = userSessionInfo.refreshToken;
      this.accessToken = userSessionInfo.accessToken;
      this.userHash = userSessionInfo.userHash;
      this.userRole = userSessionInfo.userRole;
      this.logs = userSessionInfo.logs;
      this.createdOn = userSessionInfo.createdOn;
      this.modifiedOn = userSessionInfo.modifiedOn;
      if (!isValidId(this.userId)) {
        throw new Error('user id is not valid');
      }
      if (!isValidId(this.sessionId)) {
        throw new Error('session id is not valid');
      }

      verifyToken(this.accessToken, accessTokenSecret);
      verifyToken(this.refreshToken, refreshTokenSecret);

      UserSession.error = userSessionValidate({
        userId: this.userId,
        sessionId: this.sessionId,
        refreshToken: this.refreshToken,
        accessToken: this.accessToken,
        userHash: this.userHash,
        userRole: this.userRole,
        logs: this.logs,
        createdOn: this.createdOn,
        modifiedOn: this.modifiedOn,
      });
      if (UserSession.error) throw new Error(UserSession.error);
    }
}
