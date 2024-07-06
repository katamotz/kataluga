uses Pango
uses Cairo
class Imagen: Control
	construct (posicion_x:int,posicion_y:int, nombreImagen:string)
		tipo="Imagen"
		this.direccion=nombreImagen
		this.archivo=toma_archivo_desde_direccion(nombreImagen)
		this.x=posicion_x
		this.y=posicion_y
		controles.insert (0,this)
		try
			this.pixbufer_original=new Gdk.Pixbuf.from_file(nombreImagen)
			this.alto=pixbufer_original.get_height()
			this.ancho=pixbufer_original.get_width()
			this.pixbufer=this.pixbufer_original.scale_simple(ancho,alto, Gdk.InterpType.BILINEAR)	
		except
			print "no se pudo cargar:"+toma_archivo_desde_direccion(nombreImagen)
			controles.remove_at(0)
			
	def override pinta(ctx:Cairo.Context)
		if visible
			Gdk.cairo_set_source_pixbuf(ctx, this.pixbufer , this.x, this.y)
			ctx.paint ()
			if borde 
				
				ctx.set_source_rgb(get_rojo(this.colorborde), get_verde(this.colorborde), get_azul(this.colorborde))
				ctx.set_line_width (grosorborde);
				ctx.rectangle(x-grosorborde,y-grosorborde,ancho+grosorborde+1,alto+grosorborde+1)
				ctx.stroke()
				
	def toma_archivo_desde_direccion(dir:string):string
		var partes=direccion.split("/")// [falta][cuidado con windows]
		return partes[ultimo_de_array(partes)]
	
	
	def override set_tamano(ancho_usuario:int,alto_usuario:int)
		this.ancho=ancho_usuario
		this.alto=alto_usuario
		this.pixbufer=this.pixbufer_original.scale_simple(ancho,alto, Gdk.InterpType.BILINEAR)
		
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
		
	def override set_posx(nuevox:int)
		this.x=nuevox
	def override set_borde(b:bool)
		this.borde=b
	def override set_posy(nuevoy:int)
		this.y=nuevoy
		
	def override set_alto(nuevoalto:int)
		this.alto=nuevoalto
		this.pixbufer=this.pixbufer_original.scale_simple(this.ancho,this.alto, Gdk.InterpType.BILINEAR)

	def override set_ancho(nuevoancho:int)
		this.ancho=nuevoancho
		this.pixbufer=this.pixbufer_original.scale_simple(this.ancho,this.alto, Gdk.InterpType.BILINEAR)

