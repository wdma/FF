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
NotebookDataLength[      1553,         57]
NotebookOptionsPosition[      2133,         53]
NotebookOutlinePosition[      2560,         72]
CellTagsIndexPosition[      2517,         69]
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
       ImageSizeCache->{180., {50., 57.}}]},
     {
      SliderBox[Dynamic[$CellContext`x]]}
    },
    DefaultBaseStyle->"Column",
    GridBoxAlignment->{"Columns" -> {{Center}}},
    GridBoxItemSize->{"Columns" -> {{Automatic}}, "Rows" -> {{Automatic}}}],
   "Column"],
  DynamicModuleValues:>{}]], "Output"]
},
WindowSize->{808, 621},
Visible->True,
ScrollingOptions->{"VerticalScrollRange"->Fit},
ShowCellBracket->Automatic,
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
Cell[1464, 33, 665, 18, 149, "Output"]
}
]
*)

(* End of internal cache information *)

(* NotebookSignature BwDQ6@d3i@0WSA1WN6SR@KO3 *)
