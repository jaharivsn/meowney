import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FFB7C5 0%, #FFFDD0 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 24 C10 12, 22 8, 26 14 C32 10, 32 10, 38 14 C42 8, 54 12, 52 24 C58 36, 52 54, 32 54 C12 54, 6 36, 12 24 Z"
            fill="#FFB7C5"
            stroke="#2B2B2B"
            strokeWidth="3.5"
          />
          <path d="M14 20 L24 16 L22 28 Z" fill="#FFFDD0" stroke="#2B2B2B" strokeWidth="2.5" />
          <path d="M50 20 L40 16 L42 28 Z" fill="#FFFDD0" stroke="#2B2B2B" strokeWidth="2.5" />
          <ellipse cx="22" cy="34" rx="3" ry="4" fill="#2B2B2B" />
          <ellipse cx="42" cy="34" rx="3" ry="4" fill="#2B2B2B" />
          <polygon points="32,38 29,42 35,42" fill="#FFFDD0" stroke="#2B2B2B" strokeWidth="2" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
