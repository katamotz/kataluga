uses Cairo
uses Pango


class Texto_color: Control
	lista_de_colores:list of int
	init
		lista_de_colores= new list of int
	construct (posicion_x:int,posicion_y:int,eltexto:string)
		tipo="Texto"
		this.x=posicion_x
		this.y=posicion_y
		this.texto=eltexto
		controles.insert (0,this)
		
		this.ancho=get_tamano_de_texto(this.texto,this.tipoletra,this.tamanotexto)+20
		this.alto=(int)(this.tamanotexto)+20
		
	def override pinta(ctx:Cairo.Context)
		if visible
			// configurando la letra
			ctx.select_font_face (this.tipoletra , Cairo.FontSlant.NORMAL, Cairo.FontWeight.NORMAL);
			ctx.set_font_size (this.tamanotexto);
			this.alto=(int)(tamanotexto)+20
			this.ancho=get_tamano_de_texto(this.texto,this.tipoletra,this.tamanotexto)+50
			
			cuadrado_borde_circular(ctx,x,y,ancho,alto,
				get_rojo(this.colorborde), get_verde(this.colorborde), get_azul(this.colorborde),
				get_rojo(this.colorfondo), get_verde(this.colorfondo), get_azul(this.colorfondo))
			if letra
				var pos=0
				var comienzax=x+8
				var comienzay=y+tamanotexto/3*2+10
				for var i=0 to ultima(this.texto)
					if lista_de_colores.contains(i)
						ctx.set_source_rgb(1,0,0)
					else
						ctx.set_source_rgb(get_rojo(this.colorletra), get_verde(this.colorletra), get_azul(this.colorletra))
					extents:Cairo.TextExtents
					var miletra=toma_letra(texto,i)
					ctx.text_extents (miletra, out extents);
					
					ctx.move_to (comienzax+pos,comienzay)
					ctx.show_text(miletra)
					if i<ultima(texto)
						if toma_letra(texto,i+1)!=" " 
							pos+=(int)extents.width+(int)extents.x_bearing
						else
							pos+=(int)(this.tamanotexto*2.5/3)
					ctx.stroke()
	def descale(i:int):int 
		return (i / Pango.SCALE );
		
	def override get_texto():string
		return texto
		
	def override set_texto(t:string)
		this.texto=t
		this.ancho=get_tamano_de_texto(this.texto,this.tipoletra,this.tamanotexto)+50
		
	def override set_tamanotexto(t:int)
		this.tamanotexto=t
		this.ancho=get_tamano_de_texto(this.texto,this.tipoletra,this.tamanotexto)+50
		this.alto=(int)(tamanotexto)+20

	def override set_fondovisible(fv:bool)
		this.fondo=fv
	def override set_letravisible(fv:bool)
		this.letra=fv
	def override set_colorfondo(color:string)
		this.colorfondo=color
		pass
	def override set_colorletra(color:string)
		this.colorletra=color
		pass
	def override set_colorborde(color:string)
		this.colorborde=color
		pass	
	def override get_ancho():int
		this.ancho=get_tamano_de_texto(this.texto,this.tipoletra,this.tamanotexto)+20
		return this.ancho

	def override get_centro_x():int
		return (int)this.get_ancho()/2 + this.get_posx()
		
	def override get_centro_y():int
		return (int)this.get_alto()/2 + this.get_posy()

	def override set_centro_x (x:int)
		this.set_posx (x-this.get_ancho()/2)
				
	def override set_centro_y (y:int)
		this.set_posy (y-this.get_alto()/2)
	
	def override get_alto():int
		this.alto=(int)(tamanotexto)+20
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
		
		
		
		//var ancho1=ancho-(ancho/5)
		if this.fondo
			cr.new_sub_path ();
			cr.arc ( x + ancho - radius, y + radius, radius, -90 * degrees, 0 * degrees);
			cr.arc ( x + ancho - radius, y + alto - radius, radius, 0 * degrees, 90 * degrees);
			cr.arc ( x + radius, y + alto - radius, radius, 90 * degrees, 180 * degrees);
			cr.arc ( x + radius, y + radius, radius, 180 * degrees, 270 * degrees);
			cr.close_path ();
			cr.set_source_rgb ( fondo_r,fondo_g,fondo_b);
			cr.fill_preserve ();
			
		if this.borde 
			cr.set_source_rgb ( borde_r,borde_g,borde_b);
			cr.set_line_width (grosorborde);
			cr.stroke ();
		
