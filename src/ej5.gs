


// Elije la imagen que contenga la letra señalada

class Ejercicio5:GLib.Object
	palabra_texto: Texto
	elegido:string
	imagen: list of Imagen
	miletra:string
	palabra:string
	letra_ejercicio:string
	finalizado:bool=false
	num:int=0
	x:int=420
	salir:Imagen
	corregir:Imagen
	continuar:Imagen
	iman:Rectangulo
	init 
		imagen = new list of Imagen
	
	def inicio()
		cargar_escenario()
		finalizado=false
		palabra=""
		var palabras=datos.toma_palabras_alumno(3)
		while palabra==""
			miletra=selecciona_item_str_azar(datos.alumno_letras)
			palabras=datos.toma_palabras_alumno(3)
			palabra=datos.toma_una_palabra_que_tenga_sonido (miletra,datos.alumno_palabras)
		
		palabras.add(palabra)
		desordena_lista_string (ref palabras)
		palabra=palabra.replace("_","")
		var x=50
		for var i=0 to ultimo_de_lista(palabras)
			imagen.add (new Imagen (x,150, directorio_datos+"/fotos/"+tostring(4,datos.transforma_archivo_int(palabras[i]))+".png"))
			imagen.last().arrastrable=false
			imagen.last().izq_pulsado.connect(on_imagen)
			imagen.last().valor_int=datos.transforma_archivo_int(palabras[i])
			imagen.last().valor_str=palabras[i].replace("_","")
			x+=imagen.last().get_ancho()+20
		
		palabra_texto= new Texto (450,400,Mm(miletra))
		palabra_texto.arrastrable=false
		palabra_texto.set_tamanotexto(60)
		
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Elegir la imagen que contiene con la letra...")))
		explicacion.set_tamanotexto(20)
		explicacion.set_fondovisible(false)
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
		
		continuar=new Imagen(920,170,directorio_datos+"/imagenes/flecha_der.png")
		continuar.set_tamano(50,50)
		continuar.arrastrable=false
		continuar.izq_pulsado.connect(on_continuar)
		continuar.visible=false
	
		
	def on_salir(c:Control)
		controles.clear()
		menu_principal.inicio()

	def on_continuar()
		if finalizado
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
		
	def on_corregir()
		
		if not finalizado
			if cuenta (elegido,miletra)>0
				sonidos.play ("ondo")
				datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Palabra:"+palabra+" ---- Solución: "+miletra+" ---- Respuesta: "+elegido)
				finalizado=true
				corregir.visible=false
				continuar.visible=true
			else
				sonidos.play ("gaizki")
				datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Palabra:"+palabra+" ---- Solución: "+miletra+" ---- Respuesta: "+elegido)
				
				
		
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,c.valor_int)+".ogg")
		for var i=0 to ultimo_de_lista(imagen)
			imagen[i].set_borde(false)
		c.colorborde="#0#0#0"
		c.set_borde(true)
		elegido=c.valor_str
	
	def cargar_escenario()
		controles.clear()
	
	
	
	
