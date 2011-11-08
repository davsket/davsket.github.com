function changeStyle(selector, properties) {
	var thecss = new Array();
	if (document.styleSheets){
		if (document.styleSheets[0].cssRules)  // Standards Compliant
	    {
			thecss = document.styleSheets[0].cssRules;
	    }
		else
	    {         
			thecss = document.styleSheets[0].rules;  // IE 
		}
		for (i=0;i<thecss.length;i++)
		{
		   if (thecss[i].selectorText.toLowerCase()==selector.toLowerCase())
		   {
			   thecss[i].style.cssText="font-weight:normal; color:red";
		   }
		}
	}
}