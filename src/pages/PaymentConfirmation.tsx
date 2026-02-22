export default function PaymentConfirmation() {
  return (
    <div style={{ padding: '120px 0 60px', minHeight: '100vh', background: '#f5f7fa', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: 40, background: '#fff', borderRadius: 20, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#041228', marginBottom: 12 }}>Payment Confirmed!</h1>
        <p style={{ color: '#666', fontSize: 16, lineHeight: 1.6 }}>Your application has been received. We will contact you shortly.</p>
      </div>
    </div>
  )
}
