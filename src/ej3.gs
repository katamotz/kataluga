


// Elije la imagen que corresponde a la palabra

class Ejercicio3:GLib.Object
	palabra_texto: Texto
	elegido:string
	imagen: list of Imagen
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
		var palabras=datos.toma_palabras_alumno(4)
		palabra=palabras[0].replace("_","")
		desordena_lista_string(ref palabras)
		
		var x=50
		for var i=0 to ultimo_de_lista(palabras)
			imagen.add (new Imagen (x,150, directorio_datos+"/fotos/"+tostring(4,datos.transforma_archivo_int(palabras[i] ) )+".png"))
			imagen.last().arrastrable=false
			imagen.last().izq_pulsado.connect(on_imagen)
			imagen.last().valor_int=datos.transforma_archivo_int(palabras[i])
			imagen.last().valor_str=palabras[i].replace("_","")
			x+=imagen.last().get_ancho()+2
			
		palabra_texto= new Texto (450,400,Mm(palabra))
		palabra_texto.arrastrable=false
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(210,50,Mm(t.t("Elige la imagen que corresponde a la palabra:")))
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
			if elegido==palabra
				sonidos.play ("ondo")
				datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra+" ---- Respuesta: "+elegido)
				finalizado=true
				corregir.visible=false
				continuar.visible=true
			else
				sonidos.play ("gaizki")
				datos.guardar_informe ("Mal"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra+" ---- Respuesta: "+elegido)
		
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,c.valor_int)+".ogg")
		for var i=0 to ultimo_de_lista(imagen)
			imagen[i].set_borde(false)
			
		c.set_borde(true)
		elegido=c.valor_str
	
	def cargar_escenario()
		controles.clear()
	
	
	
	
