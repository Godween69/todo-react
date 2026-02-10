function Logo({ size = 48, color = "#000" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo"
    >
      <line stroke={color} strokeWidth="2" x1="25" y1="24" x2="47" y2="24" />
      <line stroke={color} strokeWidth="2" x1="25" y1="34" x2="47" y2="34" />
      <line stroke={color} strokeWidth="2" x1="25" y1="44" x2="47" y2="44" />
      <line stroke={color} strokeWidth="2" x1="25" y1="54" x2="47" y2="54" />

      <line stroke={color} strokeWidth="2" x1="21" y1="24" x2="17" y2="24" />
      <line stroke={color} strokeWidth="2" x1="21" y1="34" x2="17" y2="34" />
      <line stroke={color} strokeWidth="2" x1="21" y1="44" x2="17" y2="44" />
      <line stroke={color} strokeWidth="2" x1="21" y1="54" x2="17" y2="54" />

      <polyline
        stroke={color}
        strokeWidth="2"
        points="23,8 10,8 10,63 54,63 54,8 41,8"
      />

      <polygon
        stroke={color}
        strokeWidth="2"
        points="36,5 36,1 28,1 28,5 24,5 22,13 42,13 40,5"
      />
    </svg>
  );
}

export default Logo;
