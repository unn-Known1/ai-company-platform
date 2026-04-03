# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within AI Company Platform, please create an issue. All security vulnerabilities will be promptly addressed.

## Security Best Practices

When deploying AI Company Platform:

1. **JWT Secret**: Always use a strong, unique secret for JWT token signing
2. **API Keys**: Never commit API keys to version control
3. **Database**: Use strong passwords for production databases
4. **CORS**: Configure CORS origins appropriately for your environment
5. **HTTPS**: Always use HTTPS in production environments

## Environment Variables

Never expose the following in client-side code:
- `JWT_SECRET`
- Database credentials
- API keys

These should only be used server-side.
