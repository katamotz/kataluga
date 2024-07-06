
def une_caracteres_clutter(a:uint,b:string):string
	var r=b
	if a==65105
		case b
			when "a" 
				r="á"
			when "e" 
				r="é"
			when "i" 
				r="í"
			when "o" 
				r="ó"
			when "u" 
				r="ú"
			when "A" 
				r="Á"
			when "E" 
				r="É"
			when "I" 
				r="Í"
			when "O" 
				r="Ó"
			when "U" 
				r="Ú"
	return r

class Entrada: Control
	car_especial:bool=false
	num_car:int
	numlinea:int=0
	vertical:bool=false
	maximo_caracteres:int=1000
	
	construct (posicion_x:int,posicion_y:int, posicion_ancho:int,posicion_alto:int,eltexto:string)
		tipo="Entrada"
		this.x=posicion_x
		this.y=posicion_y
		this.ancho=posicion_ancho
		this.alto=posicion_alto
		texto=eltexto
		controles.insert (0,this)

	def override pinta(ctx:Cairo.Context)
		cuadrado_borde_circular(ctx,x,y,ancho,alto,
			get_rojo(this.colorborde), get_verde(this.colorborde), get_azul(this.colorborde),
			get_rojo(this.colorfondo), get_verde(this.colorfondo), get_azul(this.colorfondo))
		// configurando la letra
		var font_description = new Pango.FontDescription()
		font_description=Pango.FontDescription.from_string(this.tipoletra);
		font_description.set_size((int)(this.tamanotexto * Pango.SCALE));
		// configurando la escritura del cuadro usando pango
		var playout = Pango.cairo_create_layout(ctx);
		playout.set_font_description(font_description);
		playout.set_text(texto,1000)
		playout.set_wrap(Pango.WrapMode.WORD_CHAR)
		playout.set_ellipsize(Pango.EllipsizeMode.END)
		ctx.set_source_rgb(get_rojo(this.colorletra), get_verde(this.colorletra), get_azul(this.colorletra))
		ctx.move_to(x+5, y);
		playout.set_width(ancho*Pango.SCALE)
		playout.set_height(alto*Pango.SCALE)
		Pango.cairo_show_layout(ctx,playout);
		iter: Pango.LayoutIter= playout.get_iter()
		
		if vertical
			if numlinea>=0 and numlinea<playout.get_line_count()
				var linea_actual= playout.get_line(numlinea)
				cursor_buffer=linea_actual.start_index
			
			if numlinea>=playout.get_line_count()-1 do numlinea=playout.get_line_count()-1
			if numlinea<0 do numlinea=0
			
		// desplaza el cursor izquierda...derecha
		for var i=0 to (cursor_buffer-1)
			iter.next_char()

		if seleccionado 
			// dibuja el cursor
			ink_recta:Pango.Rectangle=Pango.Rectangle()
			ink_recta=iter.get_char_extents()
			var cx = this.descale(ink_recta.x);
			var cy = this.descale(ink_recta.y);
			var ch = this.descale(ink_recta.height);
			ctx.rectangle(x+cx+5.5, y+cy+0.5, 0, ch-1.0);
			ctx.stroke();

	def descale(i:int):int 
		return (i / Pango.SCALE );
	
	def override gestiona_tecla(valor:uint,tecla:string)
		vertical=false
		if not car_especial // ha pulsado anteriormente un acento
			case valor
				when 65105 //acento grave en gnu/linux
					car_especial=true
					num_car=65105
					
				when 65293 // enter
					if cursor_buffer!=longitud(texto)
						texto= inserta_cadena(texto,"\n",cursor_buffer)
						cursor_buffer+=1
					else
						texto+="\n"
						cursor_buffer+=1
					numlinea+=1
					
				when 65362 // cursor arriba
					vertical=true
					numlinea-=1

				when 65364 // cursor abajo
					vertical=true
					numlinea+=1
					
				when 65361 // cursor izquierda
					if cursor_buffer>0
						if toma_cadena(texto,cursor_buffer-1,cursor_buffer)=="\n" do numlinea-=1
						cursor_buffer-=1
						
											
				when 65363 // cursor derecha
					if cursor_buffer<longitud(texto)
						if toma_cadena(texto,cursor_buffer,cursor_buffer+1)=="\n" do numlinea+=1
						cursor_buffer+=1
							
					
					
				when 65288 // Borrar
					if cursor_buffer>0
						cursor_buffer-=1
						texto=borra_letra(texto,cursor_buffer)
							
				when 65535 // suprimir
					if cursor_buffer>=0
						if cursor_buffer!=longitud(texto)
							texto=borra_letra(texto,cursor_buffer)
					
				when 32 //espacio
					if cursor_buffer!=longitud(texto)
						texto= inserta_cadena(texto," ",cursor_buffer)
						cursor_buffer+=1
					else
						texto+=" "
						cursor_buffer+=1
					
						
				when 241 // la ñ
					if longitud(texto)<maximo_caracteres 
						if cursor_buffer!=longitud(texto)
							texto= inserta_cadena(texto,"ñ",cursor_buffer)
							cursor_buffer+=1
						else
							texto+="ñ"
							cursor_buffer+=1
				when 209 // la ñ mayuscula
					if longitud(texto)<maximo_caracteres 
						if cursor_buffer!=longitud(texto)
							texto= inserta_cadena(texto,"Ñ",cursor_buffer)
							cursor_buffer+=1
						else
							texto+="Ñ"
							cursor_buffer+=1
				default // cualquier otra tecla
					if longitud(texto)<maximo_caracteres 
						if valida_sp(tecla) // si es una tecla valida en español, catalan o vasco
							if cursor_buffer!=longitud(texto)
								texto= inserta_cadena(texto,tecla,cursor_buffer)
								cursor_buffer+=1
							else
								texto+=tecla
								cursor_buffer+=1
		else // caracter especial: acento recogido y con la segunda tecla formamos el caracter
			var car=une_caracteres_clutter(num_car,tecla)
			if cursor_buffer!= longitud(texto)
				texto= inserta_cadena(texto,car,cursor_buffer)
				cursor_buffer+=1
			else
				texto+=car
				cursor_buffer+=1
			car_especial=false
			
		// encaja y pinta
		menu_principal.lienzo.queue_draw() //Refresca la pantalla
	

	
	def override get_ancho():int
		return this.ancho
		
	def override get_alto():int
		return this.alto
	
	def override get_posx():int
		return this.x
		
	def override get_posy():int
		return this.y
		
	def override get_texto():string
		return this.texto
		
	def control_pulsado (c:Control)
		pass
		
	def control_soltado (c:Control)
		pass
	def set_maximo_caracteres(mc:int)
		this.maximo_caracteres=mc
		
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
		
