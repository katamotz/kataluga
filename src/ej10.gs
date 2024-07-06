

// Elige la palabra correcta

class Ejercicio10:GLib.Object
	palabras: list of Texto
	palabras_str:list of string
	imagen: Imagen
	palabra:string
	solucion:string
	num:int=0
	salir:Imagen
	corregir:Imagen
	iman:Rectangulo
	
	init 
		palabras_str=new list of string
		palabras= new list of Texto
	def inicio()
		solucion=""
		// cargar el escenario: crear el escenario y los bindings de pulsacion.
		cargar_escenario()
		
		palabras_str=datos.toma_palabras_alumno(6)
		palabra=palabras_str[0]
		desordena_lista_string(ref palabras_str)
		
		// la imagen es el elemento de ayuda para que el alumno/a pueda ver que palabra tiene que rellenar.
		imagen= new Imagen (150,200,directorio_datos+"/fotos/"+tostring(4,datos.transforma_archivo_int(palabra))+".png")
		imagen.arrastrable=false
		imagen.izq_pulsado.connect(on_imagen)
		imagen.valor_str=datos.alumno_palabras[num]
		
		for var i=0 to ultimo_de_lista(palabras_str)
			palabras.add (new Texto (500,55*i+100,Mm(palabras_str[i].replace("_","")) ))
			palabras.last().izq_pulsado.connect(on_palabra)
			palabras.last().arrastrable=false
			palabras.last().set_tamanotexto(30)
		
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Elije la palabra que corresponde a la imagen.")))
		explicacion.set_tamanotexto(20)
		explicacion.set_fondovisible(false)
		explicacion.arrastrable=false
		explicacion.set_colorletra(blanco)
		
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
		if solucion.up()==palabra.replace("_","").up()
			sonidos.play("ondo")
			datos.guardar_informe ("Bien "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- Solución: "+solucion+ " ----- Respuesta:"+palabra.replace("_",""))
			
			
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
		
		else
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- Solución: "+solucion+ " ----- Respuesta:"+palabra.replace("_",""))
			
	def on_palabra (c:Control)
		solucion = c.get_texto()
		for var i=0 to ultimo_de_lista(palabras)
			palabras[i].set_colorfondo(blanco)
		c.set_colorfondo(amarillo)
			
	
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,datos.transforma_archivo_int(palabra))+".ogg")
		pass
		
	def cargar_escenario()
		controles.clear()
	
