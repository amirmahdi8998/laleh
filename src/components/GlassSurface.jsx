import './GlassSurface.css';

export default function GlassSurface({
  children,
  className = '',
  blur = 18,
  opacity = 0.06,
  color = '255,255,255',
  borderOpacity = 0.1,
  radius = 24,
  padding = 28,
  as: Tag = 'div',
  ...props
}) {
  const style = {
    '--glass-bg': `rgba(${color},${opacity})`,
    '--glass-border': `rgba(${color},${borderOpacity})`,
    '--glass-blur': `${blur}px`,
    borderRadius: `${radius}px`,
    padding: `${padding}px`,
    ...props.style,
  };
  return (
    <Tag
      className={`glass-surface ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Tag>
  );
}
