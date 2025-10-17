import * as React from 'react'

interface RSVPNotificationEmailProps {
  guestName: string
  attending: boolean
  numberOfGuests: number
  email?: string
  phone?: string
  dietaryRestrictions?: string
  message?: string
  siteSlug: string
  dashboardUrl: string
}

export const RSVPNotificationEmail = ({
  guestName,
  attending,
  numberOfGuests,
  email,
  phone,
  dietaryRestrictions,
  message,
  siteSlug,
  dashboardUrl,
}: RSVPNotificationEmailProps) => {
  const statusColor = attending ? '#16a34a' : '#dc2626'
  const statusBgColor = attending ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
  const statusText = attending ? '✓ Kommer' : '✗ Kommer inte'

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: '#FFFDF8',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        {/* Main Container */}
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#FFFDF8', padding: '40px 20px' }}>
          <tr>
            <td align="center">
              {/* Email Content */}
              <table width="600" cellPadding="0" cellSpacing="0" style={{ 
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                
                {/* Header with Brand Colors */}
                <tr>
                  <td style={{
                    background: 'linear-gradient(135deg, #B26D4A 0%, #A25D3B 100%)',
                    padding: '40px 32px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>💌</div>
                    <h1 style={{ 
                      margin: 0,
                      color: '#FFFDF8',
                      fontSize: '28px',
                      fontWeight: '700',
                      letterSpacing: '-0.5px'
                    }}>
                      Nytt OSA-svar!
                    </h1>
                    <p style={{
                      margin: '8px 0 0 0',
                      color: '#FFFDF8',
                      fontSize: '16px',
                      opacity: 0.9
                    }}>
                      från {siteSlug}
                    </p>
                  </td>
                </tr>

                {/* Status Badge */}
                <tr>
                  <td style={{ padding: '32px 32px 24px 32px' }}>
                    <div style={{
                      backgroundColor: statusBgColor,
                      borderLeft: `4px solid ${statusColor}`,
                      padding: '16px 20px',
                      borderRadius: '8px',
                      marginBottom: '24px'
                    }}>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: statusColor,
                        margin: 0
                      }}>
                        {statusText}
                      </div>
                    </div>

                    {/* Guest Info */}
                    <h2 style={{
                      margin: '0 0 20px 0',
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#1F1C14'
                    }}>
                      {guestName}
                    </h2>

                    {/* Details Grid */}
                    <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '24px' }}>
                      {attending && (
                        <tr>
                          <td style={{ 
                            padding: '12px 0',
                            borderBottom: '1px solid #F3D4C2'
                          }}>
                            <span style={{ 
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#A25D3B',
                              display: 'block',
                              marginBottom: '4px'
                            }}>
                              Antal gäster
                            </span>
                            <span style={{ 
                              fontSize: '16px',
                              color: '#1F1C14'
                            }}>
                              {numberOfGuests} {numberOfGuests === 1 ? 'person' : 'personer'}
                            </span>
                          </td>
                        </tr>
                      )}

                      {email && (
                        <tr>
                          <td style={{ 
                            padding: '12px 0',
                            borderBottom: '1px solid #F3D4C2'
                          }}>
                            <span style={{ 
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#A25D3B',
                              display: 'block',
                              marginBottom: '4px'
                            }}>
                              E-post
                            </span>
                            <a href={`mailto:${email}`} style={{ 
                              fontSize: '16px',
                              color: '#B26D4A',
                              textDecoration: 'none'
                            }}>
                              {email}
                            </a>
                          </td>
                        </tr>
                      )}

                      {phone && (
                        <tr>
                          <td style={{ 
                            padding: '12px 0',
                            borderBottom: '1px solid #F3D4C2'
                          }}>
                            <span style={{ 
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#A25D3B',
                              display: 'block',
                              marginBottom: '4px'
                            }}>
                              Telefon
                            </span>
                            <a href={`tel:${phone}`} style={{ 
                              fontSize: '16px',
                              color: '#B26D4A',
                              textDecoration: 'none'
                            }}>
                              {phone}
                            </a>
                          </td>
                        </tr>
                      )}
                    </table>

                    {/* Dietary Restrictions */}
                    {dietaryRestrictions && (
                      <div style={{
                        backgroundColor: '#F3D4C2',
                        padding: '16px',
                        borderRadius: '8px',
                        marginBottom: '16px'
                      }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#A25D3B',
                          marginBottom: '8px'
                        }}>
                          🍽️ Matpreferenser
                        </div>
                        <div style={{
                          fontSize: '15px',
                          color: '#1F1C14',
                          lineHeight: '1.5'
                        }}>
                          {dietaryRestrictions}
                        </div>
                      </div>
                    )}

                    {/* Message */}
                    {message && (
                      <div style={{
                        backgroundColor: '#F3D4C2',
                        padding: '16px',
                        borderRadius: '8px',
                        marginBottom: '24px'
                      }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#A25D3B',
                          marginBottom: '8px'
                        }}>
                          💬 Meddelande
                        </div>
                        <div style={{
                          fontSize: '15px',
                          color: '#1F1C14',
                          lineHeight: '1.5',
                          fontStyle: 'italic'
                        }}>
                          &ldquo;{message}&rdquo;
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginTop: '32px' }}>
                      <tr>
                        <td align="center">
                          <a href={dashboardUrl} style={{
                            display: 'inline-block',
                            backgroundColor: '#B26D4A',
                            color: '#FFFDF8',
                            fontSize: '16px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px rgba(178, 109, 74, 0.3)'
                          }}>
                            Visa alla OSA-svar →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{
                    backgroundColor: '#FFFDF8',
                    padding: '24px 32px',
                    textAlign: 'center',
                    borderTop: '1px solid #F3D4C2'
                  }}>
                    <p style={{
                      margin: '0 0 8px 0',
                      fontSize: '14px',
                      color: '#1F1C14',
                      opacity: 0.6
                    }}>
                      Bröllopssidan.se
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#1F1C14',
                      opacity: 0.5
                    }}>
                      Skapar minnesvärda bröllopssidor
                    </p>
                  </td>
                </tr>
              </table>

              {/* Footer Text */}
              <table width="600" cellPadding="0" cellSpacing="0" style={{ marginTop: '20px' }}>
                <tr>
                  <td style={{ 
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#1F1C14',
                    opacity: 0.5,
                    lineHeight: '1.5'
                  }}>
                    Du får detta mail eftersom någon OSA:ade på din bröllopssida.<br />
                    Hantera dina notifikationer i <a href={dashboardUrl} style={{ color: '#B26D4A' }}>dashboard</a>.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}

