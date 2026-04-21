export function PolarisLoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <s-spinner size="large" />
    </div>
  );
}
