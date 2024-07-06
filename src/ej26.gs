

// Busca las palabras de esta palabra

class Ejercicio26:GLib.Object
	letras: list of Texto
	lugares:int=0
	punto1:int=-1
	punto2:int=-1
	palabras_str:list of string
	imagen: Imagen
	palabra_solucion:string
	num:int=0
	x:int=420
	salir:Imagen
	corregir:Imagen
	iman:Rectangulo
	init 
		palabras_str= new list of string
		letras= new list of Texto
	def inicio()
		cargar_escenario()
		punto1=-1
		punto2=-1
		lugares=0
		
		
		// en palabra_ordenada guardamos la solucion correcta para que sea comparada
		var numlet=0 
		num=Random.int_range(0,tamano_de_lista(datos.alumno_palabras))
		palabra_solucion=datos.alumno_palabras[num]
		numlet=longitud(palabra_solucion)
		
		palabras_str= datos.divide_palabra_en_silabas (palabra_solucion)
		var palabra_sin_espacios=palabra_solucion.replace("_","")
		letras.clear()
		
		var y=280
		var x=50
		for var i=0 to (ultima(palabra_sin_espacios))
			letras.add(new Texto(x,y,Mm(toma_letra(palabra_sin_espacios,i))))
			letras.last().arrastrable=false
			letras.last().set_tamanotexto(20)
			letras.last().set_anchoborde(2)
			letras.last().set_colorfondo(blanco)
			letras.last().izq_pulsado.connect(on_tomar_letra)
			letras.last().valor_str=toma_letra(palabra_sin_espacios,i)
			letras.last().valor_int=i
			x+=letras.last().get_ancho()+2
			if x>800
				y+=100
				x=50
		
		imagen= new Imagen (340,150,directorio_datos+"/imagenes/erabilgarri/play.png")
		imagen.set_tamano (100,100)
		imagen.arrastrable=false;
		imagen.izq_pulsado.connect(this.on_imagen)
		imagen.valor_int=datos.transforma_archivo_int(palabra_solucion)
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Une las letras para formar las sílabas de la palabra.")))
		explicacion.set_tamanotexto(20)
		explicacion.set_colorletra(blanco)
		explicacion.set_fondovisible(false)
		explicacion.arrastrable=false
		
		///creando mandos
		salir= new Imagen(920,20,directorio_datos+"/imagenes/Terminar.png")
		salir.set_tamano(50,50)
		salir.arrastrable=false
		salir.izq_pulsado.connect(on_salir)
		
		corregir=new Imagen(920,100,directorio_datos+"/imagenes/corregir.png")
		corregir.set_tamano(50,50)
		corregir.arrastrable=false
		corregir.izq_pulsado.connect(on_corregir)
		
		
	def on_tomar_letra(c:Control)
		sonidos.play("clik")
		case lugares
			when 1
				punto2=c.valor_int
				if punto1<punto2  // si las pulsaciones son de diferentes letras unelas
					lugares=0
					var pal=""
					for var i=punto1 to punto2
						if letras[i].visible
							pal+=letras[i].valor_str
							letras[i].visible=false
					letras[punto1].set_texto(Mm(pal))
					letras[punto1].valor_str=pal
					letras[punto1].visible=true
					letras[punto1].set_colorfondo(amarillo)
				if punto1==punto2  // si pulsa dos veces en la misma palabra la volveremos a separar
					lugares=0
					var pal=letras[punto1].valor_str
					var len=ultima(letras[punto1].valor_str)
					var n=0
					
					for var i=punto1 to (punto1+len)
						letras[i].valor_str=toma_cadena(pal,n)
						letras[i].set_texto(Mm(toma_cadena(pal,n)))
						letras[i].visible=true
						letras[i].set_colorfondo(blanco)
						n++
				organiza_palabras() // aqui ordena las letras y elimina los huecos de las no visibles
			when 0
				punto1=c.valor_int
				c.set_colorfondo(rojo)
				lugares=1
				
				
	def organiza_palabras()
		var ultima_x=50
		var y=280
		for var i=0 to (ultimo_de_lista(letras))
			if letras[i].visible
				letras[i].valor_int=i
				letras[i].set_posx(ultima_x)
				letras[i].set_posy(y)
				ultima_x+=letras[i].get_ancho()+2
				if ultima_x>800
					y+=100
					ultima_x=50
	
		
	def on_salir(c:Control)
		
		controles.clear()
		menu_principal.inicio()
		
	def on_corregir (c:Control)
		var ondo=true
		var p=0
		var palabra_respuesta=""
		for var i=0 to ultimo_de_lista(letras)
			if letras[i].visible
				palabra_respuesta+=letras[i].valor_str+" "
				if (p<=ultimo_de_lista(palabras_str)) and (palabras_str[p]!=letras[i].valor_str)
					ondo=false
				p++
		if ondo
			sonidos.play("ondo")
			datos.guardar_informe ("Bien "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra_solucion+" ---- Respuesta:"+palabra_respuesta)
			
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
		else
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra_solucion+" ---- Respuesta:"+palabra_respuesta)
			
	
	def on_imagen(c:Control)
		//print "dimelo"
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,c.valor_int)+".ogg")
		
	
	def cargar_escenario()
		controles.clear()
	
	
	
	
