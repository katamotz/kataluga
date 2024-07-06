#! /bin/bash
export PKG_CONFIG_PATH=/opt/gtk-win32/lib/pkgconfig
export PKG_CONFIG_PATH=/opt/clutter-1.16.4/build/mingw/clutter-cross/lib/pkgconfig
export PKG_CONFIG_PATH=/opt/sdl2-win/lib/pkgconfig
export PKG_CONFIG_PATH=/opt/sdl2-mixer-win/lib/pkgconfig
valac --cc=i586-mingw32msvc-gcc --pkg gtk+-3.0   --pkg clutter-1.0  --pkg pango  --pkg gee-0.8  --pkg --pkg cogl-1.0   \
	 --pkg sdl2 -X -lSDL2 --pkg sdl2-mixer -X -lSDL2_mixer  -o "katamotz-ejercicios-3.exe" *.gs  -X mwindows


