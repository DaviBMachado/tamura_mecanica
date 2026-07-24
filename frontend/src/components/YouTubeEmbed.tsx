interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div style={{
      position: 'relative',
      paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
      height: 0,
      overflow: 'hidden',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: '20px'
    }}>
      <iframe 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        src={`https://www.youtube.com/embed/${videoId}`} 
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    </div>
  );
}
