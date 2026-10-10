'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [cargando, setCargando] = useState(true);
  const [carnet, setCarnet] = useState(null);
  const [dinero, setDinero] = useState(2500000); 
  const [inventario, setInventario] = useState(['Licencia de Conducir B']);
  const [vehiculos, setVehiculos] = useState([{ patente: 'CH-RP-44', modelo: 'Deportivo Elegy RH8' }]);
  const [multas, setMultas] = useState([{ id: 1, motivo: 'Exceso de velocidad', costo: 45000, explicacion: 'Vitacura a 140km/h', castigo: 'Ninguna' }]);
  const [alertaGobierno, setAlertaGobierno] = useState('Toque de queda desde las 22:00 PM.');

  const [mdtMotivo, setMdtMotivo] = useState('Conducción Temeraria');
  const [mdtCosto, setMdtCosto] = useState(50000);
  const [mdtDescripcion, setMdtDescripcion] = useState('');
  const [mdtSancionTexto, setMdtSancionTexto] = useState('');

  const [form, setForm] = useState({ nombre: '', apellido: '', nacimiento: '', sexo: 'M', nacionalidad: 'CHILENA' });
  const [vista, setVista] = useState('menu_principal'); 
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '' });
  const [passwordInput, setPasswordInput] = useState('');
  const [pinMDTInput, setPinMDTInput] = useState('');
  const [isStaff, setIsStaff] = useState(false);
  const [isCop, setIsCop] = useState(false);

  const articulos = [
    { id: 1, nombre: 'Fusil de Asalto AK-47', tipo: 'Arma', precio: 850000, icono: '💥' },
    { id: 2, nombre: 'Subfusil P90', tipo: 'Arma', precio: 520000, icono: '🔫' },
    { id: 3, nombre: 'Pistola Glock 18', tipo: 'Arma', precio: 150000, icono: '🔥' },
    { id: 4, nombre: 'Deportivo Elegy RH8', tipo: 'Vehículo', precio: 1450000, icono: '🚗' },
    { id: 5, nombre: 'Camioneta Raptor 4x4', tipo: 'Vehículo', precio: 2100000, icono: '🛻' },
    { id: 6, nombre: 'Mansión en Lo Barnechea', tipo: 'Propiedad', precio: 15000000, icono: '🏡' },
    { id: 7, nombre: 'Chaleco Antibalas Militar', tipo: 'Accesorio', precio: 45000, icono: '🛡️' }
  ];
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const c = localStorage.getItem('nexus_carnet');
      const d = localStorage.getItem('nexus_dinero');
      const i = localStorage.getItem('nexus_inventario');
      const v = localStorage.getItem('nexus_vehiculos');
      const m = localStorage.getItem('nexus_multas');
      const a = localStorage.getItem('nexus_alerta');
      if (c) setCarnet(JSON.parse(c));
      if (d) setDinero(Number(d));
      if (i) setInventario(JSON.parse(i));
      if (v) setVehiculos(JSON.parse(v));
      if (m) setMultas(JSON.parse(m));
      if (a !== null) setAlertaGobierno(a);
      setCargando(false);
    }
  }, []);

  const upMemoria = (nd, nm, ni, nv, na) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexus_dinero', nd.toString());
      localStorage.setItem('nexus_multas', JSON.stringify(nm));
      localStorage.setItem('nexus_inventario', JSON.stringify(ni));
      localStorage.setItem('nexus_vehiculos', JSON.stringify(nv));
      localStorage.setItem('nexus_alerta', na);
    }
  };

  const lanzarAviso = (msg) => {
    setNotificacion({ mostrar: true, mensaje: msg });
    setTimeout(() => setNotificacion({ mostrar: false, mensaje: '' }), 3000);
  };

  if (cargando) return <div style={{color:'#64748b',fontSize:'12px',textAlign:'center',marginTop:'40px'}}>CONECTANDO AL ENTORNO...</div>;
  if (!carnet) {
    return (
      <main className="container-principal" style={{maxWidth:'450px'}}>
        <h2 style={{textAlign:'center',fontWeight:'900',margin:'0 0 10px 0'}}>REGISTRO DE CIUDADANO</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const r = `${Math.floor(Math.random()*5+18)}.${Math.floor(Math.random()*899+100)}.${Math.floor(Math.random()*899+100)}-${Math.floor(Math.random()*9)}`;
          const n = { ...form, run: r, docNum: `BA${Math.floor(Math.random()*899+100)}` };
          setCarnet(n); localStorage.setItem('nexus_carnet', JSON.stringify(n));
          upMemoria(dinero, multas, inventario, vehiculos, alertaGobierno);
          setVista('menu_principal'); lanzarAviso('Cédula emitida de forma exitosa.');
        }} className="form-registro">
          <input type="text" placeholder="NOMBRES" required onChange={(e) => setForm({ ...form, nombre: e.target.value.toUpperCase() })} />
          <input type="text" placeholder="APELLIDOS" required onChange={(e) => setForm({ ...form, apellido: e.target.value.toUpperCase() })} />
          <input type="date" required onChange={(e) => setForm({ ...form, nacimiento: e.target.value })} />
          <select onChange={(e) => setForm({ ...form, sexo: e.target.value })}><option value="M">MASCULINO (M)</option><option value="F">FEMENINO (F)</option></select>
          <input type="text" placeholder="NACIONALIDAD (CHILENA)" onChange={(e) => setForm({ ...form, nacionalidad: e.target.value.toUpperCase() })} />
          <button type="submit">EMITIR CÉDULA</button>
        </form>
      </main>
    );
  }
  return (
    <main className="container-principal">
      {notificacion.mostrar && (
        <div style={{position:'fixed',top:'24px',right:'24px',zIndex:100,background:'#0f172a',border:'1px solid #3b82f6',padding:'16px',borderRadius:'12px',fontSize:'12px',fontWeight:'700'}}>{notificacion.mensaje}</div>
      )}

      {alertaGobierno && (
        <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',padding:'12px',borderRadius:'14px',fontSize:'11px',color:'#f87171',marginBottom:'20px',textAlign:'center',fontWeight:'800'}}>
          📢 ALERTA GUBERNAMENTAL: {alertaGobierno}
        </div>
      )}

      {vista === 'menu_principal' && (
        <div className="menu-viva-chile">
          <h2 style={{margin:'0 0 25px 0',fontSize:'26px',fontWeight:'900',textAlign:'center'}}>Elije a donde quieres ir</h2>
          <button onClick={() => setVista('carnet')} className="btn-viva-chile">🪪 Portal de Identidad & Bienes</button>
          <button onClick={() => setVista('tienda')} className="btn-viva-chile">🛒 Tienda Oficial de Suministros</button>
          <button onClick={() => setVista('mdt')} className="btn-viva-chile">🚔 Sistema MDT Carabineros</button>
          <button onClick={() => setVista('admin')} className="btn-viva-chile">🛡️ Central Administrativa (Staff)</button>
        </div>
      )}

      {vista === 'carnet' && (
        <div>
          <button onClick={() => setVista('menu_principal')} className="btn-viva-chile" style={{maxWidth:'150px',padding:'8px 12px',fontSize:'11px',marginBottom:'20px'}}>← VOLVER</button>
          <div className="carnet-chileno" style={{marginBottom:'25px'}}>
            <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid rgba(25,118,210,0.15)',paddingBottom:'6px',marginBottom:'12px'}}>
              <div><p style={{color:'#0d47a1',fontSize:'12px',fontWeight:'900',margin:0}}>CÉDULA DE IDENTIDAD</p><p style={{fontSize:'7px',color:'#1565c0',margin:0,fontWeight:'700'}}>REPÚBLICA DE CHILE</p></div>
              <p style={{margin:0,fontSize:'16px'}}>🇨🇱</p>
            </div>
            <div style={{display:'flex',gap:'20px'}}>
              <div style={{width:'90px',height:'110px',background:'rgba(25,118,210,0.08)',border:'1px solid rgba(25,118,210,0.2)',borderRadius:'10px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#0d47a1'}}><span style={{fontSize:'24px'}}>👤</span><p style={{fontSize:'8px',fontWeight:'900',margin:'4px 0 0 0'}}>{carnet.nombre}</p></div>
              <div style={{flex:1,display:'flex',flexDirection:'column',gap:'5px',color:'#1e293b',fontSize:'9px',fontFamily:'monospace'}}>
                <div><span style={{color:'#1565c0',fontSize:'7px'}}>APELLIDOS</span><strong style={{fontSize:'11px',color:'#0f172a',display:'block'}}>{carnet.apellido}</strong></div>
                <div><span style={{color:'#1565c0',fontSize:'7px'}}>NOMBRES</span><strong style={{fontSize:'11px',color:'#0f172a',display:'block'}}>{carnet.nombre}</strong></div>
                <div style={{display:'flex',gap:'20px'}}><div><span style={{color:'#1565c0',fontSize:'7px'}}>SEXO</span><br/><strong>{carnet.sexo}</strong></div><div><span style={{color:'#1565c0',fontSize:'7px'}}>RUN</span><br/><strong style={{color:'#0f172a'}}>{carnet.run}</strong></div></div>
              </div>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px'}}>
            <div className="panel-admin-box"><h4 style={{margin:'0 0 10px 0',fontSize:'13px',color:'#60a5fa'}}>🚘 Tu Garaje Web</h4>
              {vehiculos.map((v, i) => <div key={i} style={{fontSize:'11px',borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:'5px',marginBottom:'5px'}}><strong>{v.modelo}</strong><br/><span style={{color:'#64748b'}}>Patente: {v.patente}</span></div>)}
            </div>
            <div className="panel-admin-box"><h4 style={{margin:'0 0 10px 0',fontSize:'13px',color:'#ef4444'}}>⚠️ Multas y Sanciones</h4>
              {multas.length === 0 ? <p style={{fontSize:'11px',color:'#64748b'}}>Sin deudas pendientes.</p> : 
                multas.map((m) => (
                  <div key={m.id} style={{fontSize:'11px',borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:'8px',marginBottom:'8px'}}>
                    <strong>{m.motivo}</strong> — <span style={{color:'#64748b'}}>{m.explicacion}</span><br/>
                    <span style={{color:'#f87171',fontWeight:'700'}}>Valor: ${m.costo.toLocaleString()} CLP</span><br/>
                    <span style={{color:'#fbbf24',fontSize:'10px'}}>Sanción: {m.castigo}</span>
                    <button onClick={() => {
                      if (dinero >= m.costo) {
                        const ns = dinero - m.costo; const filtradas = multas.filter(x => x.id !== m.id);
                        setDinero(ns); setMultas(filtradas); upMemoria(ns, filtradas, inventario, vehiculos, alertaGobierno);
                        lanzarAviso('Multa pagada y eliminada.');
                      } else { lanzarAviso('Fondos insuficientes.'); }
                    }} className="btn-comprar-producto" style={{padding:'6px',marginTop:'6px',borderRadius:'8px'}}>Pagar Infracción</button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}
      
      {vista === 'tienda' && (
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:'15px',marginBottom:'15px'}}>
            <button onClick={() => setVista('menu_principal')} className="btn-viva-chile" style={{maxWidth:'150px',padding:'8px 12px',fontSize:'11px'}}>← VOLVER</button>
            <div className="tarjeta-fondos" style={{margin:0}}><strong>${dinero.toLocaleString()} CLP</strong></div>
          </div>
          <div className="tienda-grid">
            {articulos.map((art) => (
              <div key={art.id} className="tarjeta-producto">
                <div><div style={{fontSize:'24px'}}>{art.icono}</div><h4 style={{fontSize:'14px',margin:'6px 0'}}>{art.nombre}</h4><p style={{color:'#34d399',fontWeight:'700'}}>${art.precio.toLocaleString()} CLP</p></div>
                <button onClick={() => {
                  if (dinero >= art.precio) {
                    const ns = dinero - art.precio; let nv = [...vehiculos]; let ni = [...inventario];
                    if (art.tipo === 'Vehículo') { nv.push({ patente: `BR-PF-${Math.floor(Math.random()*89+10)}`, modelo: art.nombre }); setVehiculos(nv); }
                    else { ni.push(art.nombre); setInventario(ni); }
                    setDinero(ns); upMemoria(ns, multas, ni, nv, alertaGobierno); lanzarAviso(`Adquiriste ${art.nombre}.`);
                  } else { lanzarAviso('Dinero insuficiente.'); }
                }} className="btn-comprar-producto">Adquirir</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {vista === 'mdt' && (
        <div style={{maxWidth:'550px',margin:'0 auto'}}>
          <button onClick={() => setVista('menu_principal')} className="btn-viva-chile" style={{maxWidth:'150px',padding:'8px 12px',fontSize:'11px',marginBottom:'20px'}}>← VOLVER</button>
          {!isCop ? (
            <div className="panel-admin-box" style={{textAlign:'center'}}>
              <h3 style={{fontSize:'15px',margin:'0 0 15px 0'}}>MDT CARABINEROS DE CHILE</h3>
              <input type="password" placeholder="PIN INGRESO" onChange={(e) => setPinMDTInput(e.target.value)} />
              <button onClick={() => { if(pinMDTInput==='carabineros123') setIsCop(true); else lanzarAviso('PIN Incorrecto'); }} className="btn-viva-chile" style={{background:'#1e3a8a',marginTop:'10px'}}>Sincronizar</button>
            </div>
          ) : (
            <div className="panel-admin-box">
              <h4 style={{margin:'0 0 15px 0',color:'#3b82f6',fontWeight:'900'}}>REGISTRAR SANCIÓN PENAL</h4>
              <form onSubmit={(e) => {
                e.preventDefault();
                const nm = [...multas, { id: Date.now(), motivo: mdtMotivo, costo: Number(mdtCosto), explicacion: mdtDescripcion || 'Sin desc.', castigo: mdtSancionTexto || 'Ninguna' }];
                setMultas(nm); upMemoria(dinero, nm, inventario, vehiculos, alertaGobierno);
                setMdtDescripcion(''); setMdtSancionTexto(''); lanzarAviso('Infracción cargada.');
              }} style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                <select value={mdtMotivo} onChange={(e) => setMdtMotivo(e.target.value)}><option value="Conducción Temeraria">Conducción Temeraria</option><option value="Desacato">Desacato</option><option value="Tráfico de Armas">Tráfico de Armas</option><option value="Robo con Violencia">Robo con Violencia</option></select>
                <select value={mdtCosto} onChange={(e) => setMdtCosto(e.target.value)}><option value="50000">$50.000 CLP</option><option value="150000">$150.000 CLP</option><option value="500000">$500.000 CLP</option></select>
                <input type="text" placeholder="Descripción del Suceso" required value={mdtDescripcion} onChange={(e) => setMdtDescripcion(e.target.value)} />
                <input type="text" placeholder="Sanción Física (Ej: 10 días cárcel)" required value={mdtSancionTexto} onChange={(e) => setMdtSancionTexto(e.target.value)} />
                <button type="submit" style={{background:'#3b82f6',color:'#fff'}}>Cargar al RUN</button>
              </form>
            </div>
          )}
        </div>
      )}
      {vista === 'admin' && (
        <div style={{maxWidth:'550px',margin:'0 auto'}}>
          <button onClick={() => setVista('menu_principal')} className="btn-viva-chile" style={{maxWidth:'150px',padding:'8px 12px',fontSize:'11px',marginBottom:'20px'}}>← VOLVER</button>
          {!isStaff ? (
            <div className="panel-admin-box" style={{textAlign:'center'}}>
              <h3>CONEXIÓN STAFF</h3>
              <input type="password" placeholder="PIN" onChange={(e) => setPasswordInput(e.target.value)} />
              <button onClick={() => { if(passwordInput==='staff123') setIsStaff(true); else lanzarAviso('PIN Inválido'); }} className="btn-viva-chile" style={{background:'#ef4444',marginTop:'10px'}}>Ingresar</button>
            </div>
          ) : (
            <div className="panel-admin-box">
              <h4 style={{color:'#f87171',margin:'0 0 10px 0'}}>CONSOLA DE CONTROL</h4>
              <p style={{color:'#34d399',fontWeight:'700'}}>Banco de {carnet.nombre}: \${dinero.toLocaleString()} CLP</p>
              
              <h5 style={{margin:'15px 0 5px 0',fontSize:'11px',color:'#34d399'}}>Inyectar Capital (+ CLP)</h5>
              <div className="grid-botones-admin">
                {[1000, 10000, 50000, 100000, 1000000].map(v => (
                  <button key={`add-${v}`} onClick={() => { const ns = dinero + v; setDinero(ns); upMemoria(ns, multas, inventario, vehiculos, alertaGobierno); lanzarAviso(`Inyectados +$${v.toLocaleString()} CLP`); }} className="btn-admin-add">+{v.toLocaleString()}</button>
                ))}
              </div>

              <h5 style={{margin:'20px 0 5px 0',fontSize:'11px',color:'#f87171'}}>Retirar Capital (- CLP)</h5>
              <div className="grid-botones-admin" style={{marginTop:'8px'}}>
                {[1000, 10000, 50000, 100000, 1000000].map(v => (
                  <button key={`rem-${v}`} onClick={() => { const ns = Math.max(0, dinero - v); setDinero(ns); upMemoria(ns, multas, inventario, vehiculos, alertaGobierno); lanzarAviso(`Retirados -$${v.toLocaleString()} CLP`); }} className="btn-admin-rem">-{v.toLocaleString()}</button>
                ))}
              </div>
              
              <div style={{marginTop:'25px',paddingTop:'15px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                <label style={{color:'#94a3b8',fontSize:'10px',display:'block',marginBottom:'6px'}}>Redactar Alerta Gubernamental</label>
                <input type="text" placeholder="Escribe el decreto..." value={alertaGobierno} onChange={(e) => { setAlertaGobierno(e.target.value); localStorage.setItem('nexus_alerta', e.target.value); }} style={{marginBottom:'10px'}} />
                <button onClick={() => { setAlertaGobierno(''); localStorage.setItem('nexus_alerta', ''); lanzarAviso('Anuncio retirado.'); }} className="btn-viva-chile" style={{fontSize:'10px',padding:'8px',borderColor:'rgba(239,68,68,0.3)',color:'#f87171'}}>Quitar Anuncio</button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}