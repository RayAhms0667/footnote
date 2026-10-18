param([string]$Out)
Add-Type -AssemblyName System.Drawing

# Pixel tank, one character per pixel
$tank = @(
  "......kkkkkk........",
  ".....kLLLLLLk.......",
  ".....kggggggkBBBBBBk",
  ".....kddddddk.......",
  ".kkkkkkkkkkkkkkkkk..",
  "kLLLLLLLLLLLLLLLLLk.",
  "kggggggggggggggggggk",
  "kddddddddddddddddddk",
  "kkkkkkkkkkkkkkkkkkkk",
  "kRtRtRtRtRtRtRtRtRtk",
  ".kkkkkkkkkkkkkkkkkk."
)
$pal = @{ 'k'='#1a1d22'; 'L'='#a9c66e'; 'g'='#89a852'; 'd'='#5d7a37'; 'B'='#4a545f'; 't'='#33363b'; 'R'='#6c7178' }
function C([string]$hex){ [System.Drawing.ColorTranslator]::FromHtml($hex) }

function Draw-Tank($g, [int]$x0, [int]$y0, [int]$u){
  for($y=0;$y -lt $tank.Count;$y++){ $row=$tank[$y]
    for($x=0;$x -lt $row.Length;$x++){ $ch=$row[$x]
      if($pal.ContainsKey([string]$ch)){ $b=New-Object System.Drawing.SolidBrush (C $pal[[string]$ch]); $g.FillRectangle($b,$x0+$x*$u,$y0+$y*$u,$u,$u); $b.Dispose() } } }
}
function Bands($g,[int]$w,[int]$y0,[int]$y1,[string[]]$cols){
  $h=[math]::Ceiling(($y1-$y0)/$cols.Count)
  for($i=0;$i -lt $cols.Count;$i++){ $b=New-Object System.Drawing.SolidBrush (C $cols[$i]); $g.FillRectangle($b,0,$y0+$i*$h,$w,$h+1); $b.Dispose() }
}
$sunset=@("#2a1850","#3d1d63","#5b2473","#86307a","#b8406f","#e65e5c","#ff8a4c","#ffb35c")

function Icon([int]$size,[string]$file,[double]$fill){
  $bmp=New-Object System.Drawing.Bitmap $size,$size
  $g=[System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode='NearestNeighbor'; $g.PixelOffsetMode='Half'
  Bands $g $size 0 ([int]($size*0.72)) $sunset
  $b=New-Object System.Drawing.SolidBrush (C "#3c6b3a"); $g.FillRectangle($b,0,[int]($size*0.72),$size,$size); $b.Dispose()
  $b=New-Object System.Drawing.SolidBrush (C "#5e3f2a"); $g.FillRectangle($b,0,[int]($size*0.80),$size,$size); $b.Dispose()
  $u=[math]::Max(1,[math]::Floor($size*$fill/20))
  $x0=[int](($size-20*$u)/2); $y0=[int]($size*0.80)-11*$u+[int]($u/2)
  Draw-Tank $g $x0 $y0 $u
  $bmp.Save((Join-Path $Out $file),[System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()
}
Icon 512 "icon-512.png" 0.62
Icon 192 "icon-192.png" 0.62
Icon 180 "apple-touch-icon.png" 0.62
Icon 32  "favicon-32.png" 0.94
Icon 512 "icon-maskable-512.png" 0.46

# Share preview image 1200x630
$IW=1200;$IH=630
$bmp=New-Object System.Drawing.Bitmap $IW,$IH
$g=[System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode='NearestNeighbor'; $g.TextRenderingHint='AntiAliasGridFit'
Bands $g $IW 0 470 $sunset
for($dy=-80;$dy -le 80;$dy+=6){ $w=[math]::Sqrt(6400-$dy*$dy); if(340+$dy -gt 470){continue}; if($dy -gt 10 -and (($dy/6)%2) -eq 0){continue}
  $b=New-Object System.Drawing.SolidBrush (C ($(if($dy -lt 0){"#ffe48a"}else{"#ffc560"}))); $g.FillRectangle($b,[int](930-$w),340+$dy,[int](2*$w),6); $b.Dispose() }
$b=New-Object System.Drawing.SolidBrush (C "#3c6b3a"); $g.FillRectangle($b,0,470,$IW,40); $b.Dispose()
$b=New-Object System.Drawing.SolidBrush (C "#5e3f2a"); $g.FillRectangle($b,0,510,$IW,120); $b.Dispose()
Draw-Tank $g 120 (510-11*14+7) 14
$font=New-Object System.Drawing.Font("Consolas",104,[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
$small=New-Object System.Drawing.Font("Consolas",34,[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
$sh=New-Object System.Drawing.SolidBrush (C "#07060f"); $pk=New-Object System.Drawing.SolidBrush (C "#ff4f8b"); $ink=New-Object System.Drawing.SolidBrush (C "#f6eedb"); $yl=New-Object System.Drawing.SolidBrush (C "#ffd84a")
$g.DrawString("FOOTNOTE",$font,$sh,92,86); $g.DrawString("FOOTNOTE",$font,$pk,86,80); $g.DrawString("FOOTNOTE",$font,$ink,80,74)
$g.DrawString("DAILY HISTORY TRIVIA",$small,$yl,86,210)
$g.DrawString("Name the answers nobody else would.",$small,$ink,86,262)
$bmp.Save((Join-Path $Out "og-image.png"),[System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()
Write-Output "assets done"
