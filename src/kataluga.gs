/* 
-------------------------------------------------------------------------
- Hasiera data: 2014ko maiatzan                                         -
-
 <Kataluga- Programa para trabajar la lectura y escritura>
    Copyright (C) <año>  <nombre del autor>

    Este programa es software libre: usted puede redistribuirlo y/o modificarlo 
    bajo los términos de la Licencia Pública General GNU publicada 
    por la Fundación para el Software Libre, ya sea la versión 3 
    de la Licencia, o (a su elección) cualquier versión posterior.

    Este programa se distribuye con la esperanza de que sea útil, pero 
    SIN GARANTÍA ALGUNA; ni siquiera la garantía implícita 
    MERCANTIL o de APTITUD PARA UN PROPÓSITO DETERMINADO. 
    Consulte los detalles de la Licencia Pública General GNU para obtener 
    una información más detallada. 
-------------------------------------------------------------------------
*/


//[falta] cambiar mayusculas y minusculas para los ejercicios.
//[falta] posibilidad de leer el informe de alumno para recoger los datos de sus fallos y aciertos:

uses Gee;
uses Pango;
uses SDL;

activada:bool
sonidos:Sonidos
directorio_datos:string
directorio_sonidos:string
directorio_usuario:string
nombre_programa:string
fuentes:Fuentes
config:Config
usuarios:Usuarios
predeterminados:Predeterminados
secuencia_ejercicios:Secuencia_ejercicios
ebaluatu:Ebaluatu
menu_principal:Menu_principal
cambio_usuario:Cambio_usuario
mayusculas:bool=false // por defecto se mostrará todo en minusculas
t:Traduccion
ejercicio0:Ejercicio0; ejercicio1:Ejercicio1; ejercicio2:Ejercicio2;ejercicio3:Ejercicio3;ejercicio4:Ejercicio4;ejercicio5:Ejercicio5;
ejercicio6:Ejercicio6; ejercicio7:Ejercicio7; ejercicio8:Ejercicio8; ejercicio9:Ejercicio9; ejercicio10:Ejercicio10;
ejercicio11: Ejercicio11; ejercicio12: Ejercicio12; ejercicio13: Ejercicio13; ejercicio14: Ejercicio14; ejercicio15: Ejercicio15;
ejercicio16: Ejercicio16; ejercicio17: Ejercicio17; ejercicio18: Ejercicio18; ejercicio19: Ejercicio19; ejercicio20: Ejercicio20;
ejercicio21: Ejercicio21; ejercicio22: Ejercicio22; ejercicio23: Ejercicio23; ejercicio24: Ejercicio24; 
ejercicio25: Ejercicio25; ejercicio26: Ejercicio26; ejercicio27: Ejercicio27; ejercicio28: Ejercicio28; ejercicio29: Ejercicio29; 
ejercicio30: Ejercicio30; ejercicio31: Ejercicio31;
datos: Datos
referencia_general:int=0
lista_general:list of Control
tomado: bool=false
tomado_ontop:bool=false
tomado_x:int
tomado_y:int
tipo_abierto:int=0
nomejer: list of string // recogera los nombres de los ejercicios en un array sacado de un archivo
tipoejer:list of string // recogera el tipo de ejercicio de cada ejercicio sacado de un archivo
automatico:bool=false
numauto:int=0
ejercicio:int
fecha:GLib.Date
fecha_str:string
hora_str:string
controles: list of Control
blanco:string; negro:string; amarillo:string; verde:string; rojo:string; azul:string; transparente:string;
init 
	
	controles= new list of Control
	// inicializamos el controlador de sonido SDL o Gst
	//Gst.init (ref args)
	Gtk.init(ref args)
	SDLMixer.open(44100,SDL.Audio.AudioFormat.S16LSB,2,4096);
	
	nombre_programa="kataluga-2.0"
	directorio_datos=GLib.Environment.get_current_dir()+"/.."
	directorio_datos="/usr/share/kataluga"
	directorio_sonidos="/sonidos/zaratak/"
	directorio_usuario= GLib.Environment.get_home_dir()+"/.kataluga-2.0"
	// tomar la fecha
	var now = new DateTime.now_local ();
	fecha_str = now.get_day_of_month ().to_string()+"/"+now.get_month ().to_string()+"/"+now.get_year ().to_string()
	// tomar la hora
	hora_str = now.get_hour().to_string()+"/"+now.get_minute().to_string()+"/"+((int)now.get_seconds ()).to_string()
	
	// detectar el idioma del sistema y traducir todas las frases entrecomilladas con t.t("") delante.
	t= new Traduccion("es") // programa escrito en es: Español
	t.traduce() // busca lenguas locales y traduce.

	// comprobar si existe la carpeta ".kataluga-1.0" con los archivos dentro de configuración minimos dentro, en caso contrario crearlos por cada idioma.
	datos= new Datos()
	datos.verificar_directorio_usuario (GLib.Environment.get_home_dir())
	
	
	datos.abriendo_archivos_necesarios("katamotz-es")
	sonidos=new Sonidos()
	
	lista_general=new list of Control
	
	nomejer=datos.crea_array_de_ejercicios_segun_idioma (datos.alumno_idioma)
	tipoejer=datos.crea_array_de_tipos_segun_idioma(datos.alumno_idioma)
	
	
	
	ejercicio0= new Ejercicio0(); 
	ejercicio1= new Ejercicio1();ejercicio2= new Ejercicio2();ejercicio3= new Ejercicio3();ejercicio4= new Ejercicio4();ejercicio5= new Ejercicio5();
	ejercicio6= new Ejercicio6();ejercicio7= new Ejercicio7(); ejercicio8= new Ejercicio8(); ejercicio9= new Ejercicio9(); ejercicio10= new Ejercicio10();
	ejercicio11= new Ejercicio11(); ejercicio12= new Ejercicio12(); ejercicio13= new Ejercicio13(); ejercicio14= new Ejercicio14(); ejercicio15= new Ejercicio15();
	ejercicio16= new Ejercicio16(); ejercicio17= new Ejercicio17; ejercicio18= new Ejercicio18(); ejercicio19= new Ejercicio19(); ejercicio20= new Ejercicio20();
	ejercicio21= new Ejercicio21(); ejercicio22= new Ejercicio22(); ejercicio23= new Ejercicio23() ;ejercicio24= new Ejercicio24(); 
	ejercicio25= new Ejercicio25(); ejercicio26= new Ejercicio26(); ejercicio27= new Ejercicio27(); ejercicio28= new Ejercicio28(); ejercicio29= new Ejercicio29();
	ejercicio30= new Ejercicio30(); ejercicio31= new Ejercicio31();
	inicializa_colores()
	fuentes=new Fuentes(); fuentes.set_modal(true); fuentes.set_transient_for (menu_principal); fuentes.set_deletable(false)
	menu_principal= new Menu_principal();
	menu_principal.inicio()
	config= new Config();	config.set_modal(true); config.set_transient_for (menu_principal)
	usuarios= new Usuarios();	usuarios.set_modal(true);usuarios.set_transient_for (config)
	predeterminados= new Predeterminados();	predeterminados.set_modal(true);predeterminados.set_transient_for (config)
	secuencia_ejercicios= new Secuencia_ejercicios();	secuencia_ejercicios.set_modal(true);secuencia_ejercicios.set_transient_for (config)
	ebaluatu= new Ebaluatu ();ebaluatu.set_modal(true);	ebaluatu.set_transient_for (config)
	
	cambio_usuario= new Cambio_usuario()
	Gtk.main()
	
def Mm (s:string):string
	var r=s
	if mayusculas do r=r.up()
	return r
	
def get_tamano_de_texto(t:string,family:string,tamano:double):int
	surface:Cairo.Surface= new Cairo.ImageSurface(Cairo.Format.ARGB32,40,70)
	var cr= new Cairo.Context(surface)
	var font= new Pango.FontDescription()
	font.set_family(family)
	font.set_size((int)(tamano * Pango.SCALE));
	var l= cairo_create_layout(cr)
	l.set_text(t,300)
	l.set_font_description(font)
	var a=0
	l.get_pixel_size(out a, null)
	a=a-a/4
	return a


def continuando()
	ejercicio=-1
	if numauto>ultimo_de_lista(datos.ejercicios_automaticos)
		menu_principal.inicio()
		datos.guardar_informe ("Finaliza una seríe automatica en la fecha:"+fecha_str+" "+hora_str+". Se han realizado "+numauto.to_string()+ " ejercicios.")	
	else
		ejercicio=datos.ejercicios_automaticos[numauto]
		numauto++
		iniciaejercicio(ejercicio)
		
def inicializa_colores()
	blanco="1#1#1"; negro="0#0#0"; amarillo="1#1#0"; verde="0#1#0"; rojo="1#0#0"; azul="0#0#1";
	transparente="0#0#0#0"
def iniciaejercicio(ejer:int)
	ejercicio=ejer
	case ejer
		when 0
			ejercicio0.inicio()
		when 1
			ejercicio1.inicio()
		when 2
			ejercicio2.inicio()
		when 3
			ejercicio3.inicio()
		when 4
			ejercicio4.inicio()
		when 5
			ejercicio5.inicio()
		when 6
			ejercicio6.inicio()
		when 7
			ejercicio7.inicio()
		when 8
			ejercicio8.inicio()
		when 9
			ejercicio9.inicio()
		when 10
			ejercicio10.inicio()
		when 11
			ejercicio11.inicio()
		when 12
			ejercicio12.inicio()
		when 13
			ejercicio13.inicio()
		when 14
			ejercicio14.inicio()
		when 15
			ejercicio15.inicio()
		when 16
			ejercicio16.inicio()
		when 17
			ejercicio17.inicio()
		when 18
			ejercicio18.inicio()
		when 19
			ejercicio19.inicio()
		when 20
			ejercicio20.inicio()
		when 21
			ejercicio21.inicio()
		when 22
			ejercicio22.inicio()
		when 23
			ejercicio23.inicio()
		when 24
			ejercicio24.inicio()
		when 25
			ejercicio25.inicio()
		when 26
			ejercicio26.inicio()
		when 27
			ejercicio27.inicio()
		when 28
			ejercicio28.inicio()
		when 29
			ejercicio29.inicio()
		when 30
			ejercicio30.inicio()
		when 31
			ejercicio31.inicio()
