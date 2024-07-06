
class Rectangulo: Control
	
	construct (posicion_x:int,posicion_y:int,ancho:int,alto:int)
		tipo="Rectangulo"
		this.x=posicion_x
		this.y=posicion_y
		this.ancho=ancho
		this.alto=alto
		this.colorfondo=("1#0.5#0")
		this.arrastrable=false
		this.figurafondo=true
		controles.insert (0,this)
		
	def override pinta(ctx:Cairo.Context)
		if visible
			cuadrado_borde_circular(ctx,x,y,ancho,alto,
				get_rojo(this.colorborde), get_verde(this.colorborde), get_azul(this.colorborde),
				get_rojo(this.colorfondo), get_verde(this.colorfondo), get_azul(this.colorfondo))
		
	def descale(i:int):int 
		return (i / Pango.SCALE );
		
	def override get_centro_x():int
		return (int)this.get_ancho()/2 + this.get_posx()
		
	def override get_centro_y():int
		return (int)this.get_alto()/2 + this.get_posy()

	def override set_centro_x (x:int)
		this.set_posx (x-this.get_ancho()/2)
				
	def override set_centro_y (y:int)
		this.set_posy (y-this.get_alto()/2)
	
	def override get_ancho():int
		return this.ancho
		
	def override get_alto():int
		return this.alto
	
	def override get_posx():int
		return this.x
		
	def override get_posy():int
		return this.y
		
	def override set_posx(x:int)
		this.x=x
		
	def override set_posy(y:int)
		this.y=y

	def control_pulsado (c:Control)
		pass
		
	def control_soltado (c:Control)
		pass

	def cuadrado_borde_circular(cr:Cairo.Context,x:int,y:int,ancho:int,alto:int, 
		borde_r:double, borde_g:double, borde_b:double, 
		fondo_r:double,fondo_g:double,fondo_b:double)
		/* a custom shape that could be wrapped in a function */
		var aspect = 1.2;     
		var corner_radius = alto / 10.0;  

		radius:double= corner_radius / aspect;
		degrees:double = 3.14 / 180
		
		
		cr.new_sub_path ();
		cr.arc ( x + ancho - radius, y + radius, radius, -90 * degrees, 0 * degrees);
		cr.arc ( x + ancho - radius, y + alto - radius, radius, 0 * degrees, 90 * degrees);
		cr.arc ( x + radius, y + alto - radius, radius, 90 * degrees, 180 * degrees);
		cr.arc ( x + radius, y + radius, radius, 180 * degrees, 270 * degrees);
		cr.close_path ();

		if this.fondo
			cr.set_source_rgb ( fondo_r,fondo_g,fondo_b);
			cr.fill_preserve ();
		var alpha=1
		if this.borde do alpha=0
		cr.set_source_rgba ( borde_r,borde_g,borde_b,alpha);
		cr.set_line_width ( 1);
		cr.stroke ();
		
