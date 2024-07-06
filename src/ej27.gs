

// Elige la palabra correcta

class Ejercicio27:GLib.Object
	definiciones: list of Texto
	definiciones_str:list of string
	imagen: Imagen
	palabra:string
	solucion:string
	respuesta:string
	num:int=0
	salir:Imagen
	corregir:Imagen
	iman:Rectangulo
	
	init 
		definiciones_str=new list of string
		definiciones= new list of Texto
	def inicio()
		solucion=""
		// cargar el escenario: crear el escenario y los bindings de pulsacion.
		cargar_escenario()
		definiciones_str.clear()
		definiciones.clear()
		var defs=datos.toma_definiciones(3)
		for var i=0 to ultimo_de_lista(defs) do definiciones_str.add( defs[i].split("/")[1] )
		palabra=defs[0].split("/")[0]
		solucion=defs[0].split("/")[1]
		desordena_lista_string(ref definiciones_str)
		
		// la imagen es el elemento de ayuda para que el alumno/a pueda ver que palabra tiene que rellenar.
		imagen= new Imagen (350,100,directorio_datos+"/fotos/"+tostring(4,datos.transforma_archivo_int(palabra))+".png")
		imagen.arrastrable=false
		imagen.izq_pulsado.connect(on_imagen)
		imagen.valor_str=datos.todas_definiciones[num]
		
		for var i=0 to ultimo_de_lista(definiciones_str)
			definiciones.add (new Texto (50,55*i+300,Mm(definiciones_str[i].replace("_","")) ))
			definiciones.last().izq_pulsado.connect(on_palabra)
			definiciones.last().arrastrable=false
			definiciones.last().set_tamanotexto(25)
			definiciones.last().set_anchoborde(2)
		
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Elije la frase que corresponde a la imagen.")))
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
		
		
	def on_salir(c:Control)
		
		controles.clear()
		menu_principal.inicio()
		
	def on_corregir()
		if solucion.up()==respuesta.up()
			sonidos.play("ondo")
			datos.guardar_informe ("Bien "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- Palabra: "+palabra.replace("_","")+ " ---- Solución: "+solucion+ " ----- Respuesta:"+respuesta)
			
			
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
		
		else
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- Palabra: "+palabra.replace("_","")+" ---- Solución: "+solucion+ " ----- Respuesta:"+respuesta)
			
	def on_palabra (c:Control)
		respuesta = c.get_texto()
		for var i=0 to ultimo_de_lista(definiciones)
			definiciones[i].set_colorfondo(blanco)
		c.set_colorfondo(amarillo)
			
	
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,datos.transforma_archivo_int(palabra))+".ogg")
		pass
		
	def cargar_escenario()
		controles.clear()
	
