(* Content-type: application/vnd.wolfram.cdf.text *)

(*** Wolfram CDF File ***)
(* http://www.wolfram.com/cdf *)

(* CreatedBy='Mathematica 10.4' *)

(*************************************************************************)
(*                                                                       *)
(*  The Mathematica License under which this file was created prohibits  *)
(*  restricting third parties in receipt of this file from republishing  *)
(*  or redistributing it by any means, including but not limited to      *)
(*  rights management or terms of use, without the express consent of    *)
(*  Wolfram Research, Inc. For additional information concerning CDF     *)
(*  licensing and redistribution see:                                    *)
(*                                                                       *)
(*        www.wolfram.com/cdf/adopting-cdf/licensing-options.html        *)
(*                                                                       *)
(*************************************************************************)

(*CacheID: 234*)
(* Internal cache information:
NotebookFileLineBreakTest
NotebookFileLineBreakTest
NotebookDataPosition[      1064,         20]
NotebookDataLength[      1646,         60]
NotebookOptionsPosition[      2158,         53]
NotebookOutlinePosition[      2653,         75]
CellTagsIndexPosition[      2610,         72]
WindowFrame->Normal*)

(* Beginning of Notebook Content *)
Notebook[{
Cell[BoxData[
 DynamicModuleBox[{$CellContext`s$$ = Slider[
   Dynamic[$CellContext`x]], $CellContext`dplot$$ = Table[{
    Sin[10 $CellContext`x #], 
    Sin[2 $CellContext`x #]}, {$CellContext`x, 0.001, 1, 0.001}]& }, 
  TagBox[GridBox[{
     {
      DynamicBox[ToBoxes[
        ListPlot[
         $CellContext`dplot$$[$CellContext`x]], StandardForm],
       ImageSizeCache->{173., {48., 55.}}]},
     {
      SliderBox[Dynamic[$CellContext`x]]}
    },
    DefaultBaseStyle->"Column",
    GridBoxAlignment->{"Columns" -> {{Center}}},
    GridBoxItemSize->{"Columns" -> {{Automatic}}, "Rows" -> {{Automatic}}}],
   "Column"],
  DynamicModuleValues:>{}]], "Output", "PluginEmbeddedContent"]
},
WindowSize->{204, 147},
Visible->True,
AuthoredSize->{204, 147},
ScrollingOptions->{"HorizontalScrollRange"->Fit,
"VerticalScrollRange"->Fit},
ShowCellBracket->False,
Deployed->True,
CellContext->Notebook,
TrackCellChangeTimes->False,
FrontEndVersion->"10.4 for Linux x86 (64-bit) (April 11, 2016)",
StyleDefinitions->"Default.nb"
]
(* End of Notebook Content *)

(* Internal cache information *)
(*CellTagsOutline
CellTagsIndex->{}
*)
(*CellTagsIndex
CellTagsIndex->{}
*)
(*NotebookFileOutline
Notebook[{
Cell[1464, 33, 690, 18, 130, "Output"]
}
]
*)

(* End of internal cache information *)

(* NotebookSignature pw0q5bOlgtksjBguReCdSXqJ *)
